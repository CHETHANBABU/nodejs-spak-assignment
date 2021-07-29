import MainDb from "../configs/sql";
const Sequelize = require('sequelize');
import TaskModel from './task.model';

const User = MainDb.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    gender: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false }
}, { timestamps: false });
User.hasMany(TaskModel, { as: 'tasks' });

export default User;