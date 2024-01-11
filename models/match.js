'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Summoner, {
        sourceKey: 'summoner_id',
        foreignKey: 'summoner_id',
      });
    }
  }
  Match.init(
    {
      match_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      summoner_id: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Match',
    }
  );
  return Match;
};
