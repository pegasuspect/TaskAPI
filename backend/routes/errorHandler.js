module.exports = (err, req, res, next) => {
  console.error(err);

  const responseStatus = err.status || 500;
  const errorResponse = {
    status: responseStatus,
    message: err.message,
  };

  if (process.env.NODE_ENV !== "production") {
    // Only send stack trace for development.
    errorResponse.stackTrace = err.stack.split('\n');
  }

  res.status(responseStatus).json(errorResponse);
}