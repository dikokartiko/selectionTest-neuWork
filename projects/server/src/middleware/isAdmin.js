const { User } = require("../models");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { userId: req.userId } });

    if (user.roleId !== 1) {
      return res
        .status(403)
        .json({ error: "You do not have permission to perform this action" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isAdmin;
