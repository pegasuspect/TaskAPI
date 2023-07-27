let currentUser;

const dummySession = async (req, res, next) => {

  if (req.path == '/logout') {
    currentUser = null;
    res.json({ message: 'You are logged out!' });
    return;
  }

  if (!currentUser) {
    try {
      const { User } = req.db;

      if (req?.query?.loginAs) {
        currentUser = await User.findByPk(req.query.loginAs);
      } else {
        currentUser = await User.findByPk(1);
      }
    } catch (error) {
      next(error);
      // stop function execution, so next isn't called again.
      return;
    }
  }

  req.user = currentUser;
  next();
};

module.exports = dummySession;