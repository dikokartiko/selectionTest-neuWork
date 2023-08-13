"use strict";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getWorkingDays = (startDate, endDate) => {
  const workingDays = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDays;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attendanceData = [];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 2);
    const workingDays = getWorkingDays(startDate, endDate);

    for (let i = 1; i <= 10; i++) {
      for (const date of workingDays) {
        const clockIn = getRandomInt(0, 1) ? "09:00" : "10:00";
        const clockOut = getRandomInt(0, 1) ? "17:00" : "16:00";
        const lateClockin = clockIn === "10:00" ? 1 : 0;
        const earlyClockOut = clockOut === "16:00" ? 1 : 0;
        const absent = i === 1 && date.getDay() === 1 ? 1 : 0;

        attendanceData.push({
          clockIn,
          clockOut,
          date,
          ontime: lateClockin === 0 && earlyClockOut === 0 ? 1 : 0,
          lateClockin,
          earlyClockOut,
          absent,
          userId: i,
          scheduleId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("Attendances", attendanceData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
