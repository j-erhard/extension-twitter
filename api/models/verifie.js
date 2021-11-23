const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verifie', {
    idTweet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tweets',
        key: 'id'
      }
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilisateurs',
        key: 'id'
      }
    },
    idJugement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jugements',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'verifie',
    timestamps: false,
    indexes: [
      {
        name: "idTweet",
        using: "BTREE",
        fields: [
          { name: "idTweet" },
        ]
      },
      {
        name: "idUtilisateur",
        using: "BTREE",
        fields: [
          { name: "idUtilisateur" },
        ]
      },
      {
        name: "idJugement",
        using: "BTREE",
        fields: [
          { name: "idJugement" },
        ]
      },
    ]
  });
};
