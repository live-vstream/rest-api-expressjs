const Stream = require('../models/stream'),
  User = require('../models/user');

var generateRandomToken = function() {
  var N = 5; // token length
  return Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
}

exports.newStream = function (req, res, next) {

  if (!req.body.title) {
    res.status(422).send({ error: 'Please specify the stream title.' });
    return next();
  }

  var newToken = generateRandomToken();

  var expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate()+1); /* expires in 24hrs */

  /* Filename is of the form 'firstName_milliseconds' */
  var fileName = req.user.firstName + '_' + (new Date()).getTime();

  const stream = new Stream({
    title: req.body.title,
    createdBy: req.user._id,
    filename: fileName,
    tokens: [{value: newToken, expiresAt: expiryDate}] /* Create a new token  by default */
    });

  stream.save((err, newStream) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'Successfully intiated a stream.', stream: newStream });
    
  });
};


/* Returns all of the streams created by currently authenticated Publisher */
exports.getPublishedStreams = function (req, res, next) {
  
  Stream.find({ createdBy: req.user._id }, (err, stream) => {
    if(err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({streams: stream});
  }); 

};


