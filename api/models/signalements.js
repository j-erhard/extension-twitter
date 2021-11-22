const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('signalements', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idTweet: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tweets',
        key: 'id'
      }
    },
    sujet: {
      type: DataTypes.ENUM('politique','religion'),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'signalements',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idTweet",
        using: "BTREE",
        fields: [
          { name: "idTweet" },
        ]
      },
    ]
  });
};
