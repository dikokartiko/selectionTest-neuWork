// controller/payrollcontroller
const { Payroll, Attendance, Salary } = require("../models");
const { Op } = require("sequelize");

const getPayrollReport = async (req, res) => {
  const { userId } = req;
  const { startDate, endDate } = req.query;

  try {
    // Find the user's salary
    const salary = await Salary.findOne({ where: { userId } });
    if (!salary) {
      return res.status(404).json({ error: "Salary not found" });
    }

    // Find the user's payroll deductions
    const payrollDeductions = await Payroll.findAll({
      where: {
        userId,
        payday: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    // Find the user's attendance records
    const attendanceRecords = await Attendance.findAll({
      where: {
        userId,
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    // Group payroll deductions by month
    const monthlyPayrollDeductions = payrollDeductions.reduce(
      (acc, deduction) => {
        const month = new Date(deduction.payday).getMonth();
        acc[month] = acc[month] || [];
        acc[month].push(deduction);
        return acc;
      },
      {}
    );

    // Group attendance records by month
    const monthlyAttendanceRecords = attendanceRecords.reduce((acc, record) => {
      const month = new Date(record.date).getMonth();
      acc[month] = acc[month] || [];
      acc[month].push(record);
      return acc;
    }, {});

    // Calculate monthly salary reports
    const salaryReports = [];
    for (let month = 0; month < 12; month++) {
      // Calculate the total deductions for the current month
      let totalDeductions = 0;
      if (monthlyPayrollDeductions[month]) {
        for (const deduction of monthlyPayrollDeductions[month]) {
          totalDeductions += deduction.deductionTotal;
        }
      }

      // Calculate the attendance deductions for the current month
      let lateDeductions = 0;
      let earlyDeductions = 0;
      let absentDeductions = 0;
      if (monthlyAttendanceRecords[month]) {
        for (const attendance of monthlyAttendanceRecords[month]) {
          if (attendance.lateClockin) {
            lateDeductions += salary.amount * 0.01;
          }
          if (attendance.earlyClockOut) {
            earlyDeductions += salary.amount * 0.01;
          }
          if (attendance.absent) {
            absentDeductions += salary.amount * 0.05;
          }
        }
      }

      // Calculate the net salary for the current month
      const netSalary =
        salary.amount -
        totalDeductions -
        lateDeductions -
        earlyDeductions -
        absentDeductions;

      // Add the current month's salary report to the array
      salaryReports.push({
        month,
        salary: salary.amount,
        deductions: totalDeductions,
        lateDeductions,
        earlyDeductions,
        absentDeductions,
        netSalary,
      });
    }

    res.status(200).json(salaryReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPayrollReport,
};

module.exports = {
  getPayrollReport,
};
