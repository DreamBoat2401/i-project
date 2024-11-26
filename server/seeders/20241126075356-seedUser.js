'use strict';

const { hashPassword } = require('../helpers/bcrypt');

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
   const users = require('../data/user.json')
   users.forEach(el => {
    delete el.id
    el.password = hashPassword(el.password)
    el.createdAt = el.updatedAt = new Date()
   })
  //  console.log(users);
  await queryInterface.bulkInsert('Users', users, {})
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
