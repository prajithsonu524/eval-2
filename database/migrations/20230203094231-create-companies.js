/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,

        type: Sequelize.INTEGER
      },
      compId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      compName: {
        type: Sequelize.STRING
      },
      compSector: {
        type: Sequelize.STRING
      },
      CEO: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};