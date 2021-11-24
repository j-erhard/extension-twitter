module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER,allowNull: false},
        prenom: { type: Sequelize.STRING,notEmpty: false},
        nom: { type: Sequelize.STRING,notEmpty: false},
        email: { type:Sequelize.STRING, validate: {isEmail:true} },
        password : {type: Sequelize.STRING,allowNull: false },
        type : {type: Sequelize.ENUM('admin','verificateur','visiteur'),notEmpty: true}
    }, {
        tableName: 'utilisateurs',
        timestamps: false
    });
    return User; }