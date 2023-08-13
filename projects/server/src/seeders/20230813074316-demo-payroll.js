"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("payrolls", [
      {
        userId: 1,
        salaryId: 1,
      },
      {
        userId: 2,
        salaryId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("payrolls", null, {});
  },
};
