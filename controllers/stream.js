const Stream = require('../models/stream'),
  User = require('../models/user');

exports.newStream = function (req, res, next) {
  if (!req.body.token) {
    res.status(422).send({ error: 'Please specify the token.' });
    return next();
  }

  if (!req.body.title) {
    res.status(422).send({ error: 'Please specify the stream title.' });
    return next();
  }

  const stream = new Stream({
    token: req.body.token,
    title: req.body.title,
    created_by: req.user
    });

  stream.save((err, newStream) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'Stream initialized!', streamToken: newStream.token });
    
  });
};

