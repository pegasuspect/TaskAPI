const { createHttpError } = require("../lib/utils");

const authenticate = (req, _, next) => {
  if (!req.user) {
    console.log('Authentication failed, no user in the request!');
    
    next(createHttpError(401, 'Unauthorized!'));
    return;
  }

  console.log('Authenticating user #', req.user.id);
  
  if (!['Manager', 'Technician'].includes(req.user.role)) {
    console.log('User role is not recognized:', req.user.role);
    
    next(createHttpError(401, 'Unauthorized!'));
    return;
  }

  next();
};

module.exports = authenticate;