module.exports = (req, res, next) => {
  next(createHttpError(404, 'Not Found!'));
}