const errorHandler = (err, req, res, next) => {
  const status = err.status || 404;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status,
    message,
    data: err.data || null,
  });
};

module.exports = errorHandler;
