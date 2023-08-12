const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User, Role, Salary } = require("../models");
const { sendMail } = require("../helpers/mailer");

const SALT_ROUNDS = 10;

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    email,
    password,
    fullname,
    birthdate,
    joinDate,
    address,
    phoneNumber,
    salaryAmount,
    status,
    roleId,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullname,
      birthdate,
      joinDate,
      address,
      phoneNumber,
      status,
      roleId,
    });

    await Salary.create({
      amount: salaryAmount,
      userId: user.userId,
    });

    const role = await Role.findOne({ where: { roleId: user.roleId } });

    if (role.roleName === "employee") {
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
      await User.update({ token }, { where: { userId: user.userId } });

      const subject = "Welcome to the Company!";
      const text = `Dear ${fullname},\n\nWelcome to the company! As a new employee, you are required to set a new password for your account. Please follow this link to set your new password: ${process.env.BASE_URL}/reset-password/${token}\n\nPlease note that this link can only be used once. If you need to reset your password again in the future, please contact an administrator.\n\nBest regards,\nThe Company`;

      sendMail(email, subject, text);
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
};
