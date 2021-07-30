import MainDb from "../configs/sql";
const Sequelize = require('sequelize');
import TaskModel from './task.model';

const User = MainDb.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: true, defaultValue: '' },
    gender: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    mobile: { type: Sequelize.STRING, allowNull: false },
}, { timestamps: false });
User.hasMany(TaskModel, { as: 'tasks' });

export default User;