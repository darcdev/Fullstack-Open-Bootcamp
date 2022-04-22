const handleErrors = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'UnauthorizedError') {
    return res.status(401).send({ error: error.message });
  }
  next(error);
};

module.exports = handleErrors;
