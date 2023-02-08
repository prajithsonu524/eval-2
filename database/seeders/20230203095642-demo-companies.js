/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Companies', [{
      compId: '8e4efer-234k234-324d-4234',
      compName: 'Prajith Motors',
      compSector: 'Automobile',
      CEO: 'Prajith',
      score: 33.33,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      compId: 'f4efer-23434-32234d-442344',
      compName: 'Aarya Technologies',
      compSector: 'Software',
      CEO: 'Aarya',
      score: 67.45,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
