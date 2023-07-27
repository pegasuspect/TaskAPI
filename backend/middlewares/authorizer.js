const { createHttpError } = require("../lib/utils");

const is = (role) => (req, res, next) => {
  if (req.user?.role === role) {
    console.log('Authorization granted for user #', req.user.id);
    
    next();
  } else {
    console.log('Authorization failed for user with role', req.user?.role);
    
    next(createHttpError(401, 'Insufficient access!'));
  }
};

module.exports = is;