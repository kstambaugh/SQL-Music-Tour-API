'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('set_Times', {
      set_time_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER
      },
      stage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      band_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('set_Times');
  }
};