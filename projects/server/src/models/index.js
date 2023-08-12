const UserModel = require("./user");
const RoleModel = require("./role");
const PayrollModel = require("./payroll");
const ScheduleModel = require("./schedule");
const AttendanceModel = require("./attendance");
const SalaryModel = require("./salary");

const sequelize = require("../config/database");
const Sequelize = require("sequelize");

const User = new UserModel(sequelize, Sequelize);
const Role = new RoleModel(sequelize, Sequelize);
const Payroll = new PayrollModel(sequelize, Sequelize);
const Schedule = new ScheduleModel(sequelize, Sequelize);
const Attendance = new AttendanceModel(sequelize, Sequelize);
const Salary = new SalaryModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
  Role,
  Payroll,
  Schedule,
  Attendance,
  Salary,
};
