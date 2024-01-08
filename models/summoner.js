'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Summoner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Match, {
        sourceKey: 'summoner_id',
        foreignKey: 'summoner_id',
      });
    }
  }
  Summoner.init(
    {
      summoner_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      summoner_name: {
        type: DataTypes.STRING,
      },
      summoner_tag_line: {
        type: DataTypes.STRING,
      },
      summoner_level: {
        type: DataTypes.INTEGER,
      },
      profile_icon_id: {
        type: DataTypes.INTEGER,
      },
      puuid: {
        type: DataTypes.STRING,
      },
      s_tier: {
        type: DataTypes.STRING,
      },
      s_rank: {
        type: DataTypes.STRING,
      },
      s_league_points: {
        type: DataTypes.INTEGER,
      },
      s_wins: {
        type: DataTypes.INTEGER,
      },
      s_losses: {
        type: DataTypes.INTEGER,
      },
      f_tier: {
        type: DataTypes.STRING,
      },
      f_rank: {
        type: DataTypes.STRING,
      },
      f_league_points: {
        type: DataTypes.INTEGER,
      },
      f_wins: {
        type: DataTypes.INTEGER,
      },
      f_losses: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Summoner',
    }
  );
  return Summoner;
};
