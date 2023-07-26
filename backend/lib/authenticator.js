const authenticate = (req, res, next) => {
  console.log(req.session);
  if (req.query.valid) {
    next();
  } else {
    const error = new Error('401 - Unauthorized');
    error.status = 401;
    next(error);
  }
};

module.exports = authenticate;