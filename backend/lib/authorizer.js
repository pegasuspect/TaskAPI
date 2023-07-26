const is = (role) => (req, res, next) => {
  if (req.query.role === role) {
    next();
  } else {
    const error = new Error('401 - Unauthorized');
    error.status = 401;
    next(error);
  }
};

module.exports = is;