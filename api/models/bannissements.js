const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bannissements', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateurs',
        key: 'id'
      }
    },
    raison: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateBan: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Duree: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bannissements',
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
        name: "idUtilisateur",
        using: "BTREE",
        fields: [
          { name: "idUtilisateur" },
        ]
      },
    ]
  });
};
