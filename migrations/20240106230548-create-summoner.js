'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Summoners', {
      summoner_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      summoner_name: {
        type: Sequelize.STRING,
      },
      summoner_tag_line: {
        type: Sequelize.STRING,
      },
      summoner_level: {
        type: Sequelize.INTEGER,
      },
      profile_icon_id: {
        type: Sequelize.INTEGER,
      },
      puuid: {
        type: Sequelize.STRING,
      },
      s_tier: {
        type: Sequelize.STRING,
      },
      s_rank: {
        type: Sequelize.STRING,
      },
      s_league_points: {
        type: Sequelize.INTEGER,
      },
      s_wins: {
        type: Sequelize.INTEGER,
      },
      s_losses: {
        type: Sequelize.INTEGER,
      },
      f_tier: {
        type: Sequelize.STRING,
      },
      f_rank: {
        type: Sequelize.STRING,
      },
      f_league_points: {
        type: Sequelize.INTEGER,
      },
      f_wins: {
        type: Sequelize.INTEGER,
      },
      f_losses: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Summoners');
  },
};
