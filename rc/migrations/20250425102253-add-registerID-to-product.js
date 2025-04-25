'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'registerID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Registers', // <-- change this to the actual table name if it's different
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // or 'CASCADE' / 'RESTRICT' depending on your logic
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'registerID');
  }
};
