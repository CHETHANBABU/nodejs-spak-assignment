import MainDb from "../configs/sql";
const Sequelize = require('sequelize');

const Task = MainDb.define('task', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    priority: { type: Sequelize.INTEGER, allowNull: false },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
    isCompleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
    userId: { type: Sequelize.INTEGER, allowNull: true, defaultValue: false },
}, { timestamps: false });

export default Task;