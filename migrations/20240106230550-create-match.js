'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      match_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      summoner_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Summoners',
          key: 'summoner_id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  },
};
