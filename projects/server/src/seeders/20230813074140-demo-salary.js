"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("salaries", [
      {
        amount: 5000000,
        userId: 1,
      },
      {
        amount: 3000000,
        userId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salaries", null, {});
  },
};
