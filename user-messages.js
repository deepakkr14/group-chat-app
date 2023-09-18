const Sequelize = require("sequelize");

const sequelize = require("./database");

const Message = sequelize.define("messages", {
    messages:{
        type:Sequelize.CHAR
    }
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type:Sequelize.STRING,
//   allowNull:false},
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     primaryKey: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   phone: {
//     type: Sequelize.BIGINT,
//     allowNull: false,
//   }
});

module.exports = Message;
