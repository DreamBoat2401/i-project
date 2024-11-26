'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const categories = require('../data/category.json')
   categories.forEach(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date ()
   })
  //  console.log(categories);
   await queryInterface.bulkInsert('Categories', categories, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
   await queryInterface.bulkDelete('Categories', null, {});
  }
};