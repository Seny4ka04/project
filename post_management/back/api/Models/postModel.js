const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:password1@localhost:5432/post-management', {
    dialect: 'postgres',
});

const Post = sequelize.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = { Post, sequelize };
// sequelize.sync({ force: false }).then(() => {
//     console.log("db has been re sync") })