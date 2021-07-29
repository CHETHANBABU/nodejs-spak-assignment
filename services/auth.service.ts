const Sequelize = require('sequelize'), op = Sequelize.Op;

import { UserModel } from '../models/index';
import { ERROR_MSG, SUCCESS_MSG } from '../utils/messages.constants';
class AuthService {
    // User registeration
    register(data: any): any {
        return new Promise((resolve, reject) => {
            // Create a new user
            data.email = data.email.toLowerCase();
            const model = UserModel.build(data);
            model.save().then(info =>
                resolve({ message: `${SUCCESS_MSG.USER_REGISTER}` })
                , err => {
                    // handle error
                    console.log(`AUDT:Register - ${data.email}; ${err.message} : ${new Date()};ERROR`);
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        reject({ message: `${ERROR_MSG.USER_EMAIL_EXIST}` });
                    } else {
                        reject({ message: `${ERROR_MSG.USER_REGISTER}` });
                    }
                });
        });
    }

    // User authentication
    login(data: any): any {
        let filter = {
            [op.and]: [{ email: data.email.toLowerCase() },
            { password: data.password }]
        };
        return new Promise((resolve, reject) => {
            // check user existence
            UserModel.findOne({
                where: filter,
                attributes: { exclude: ['password'] }
            }).then((user: any) => {
                if (user) {
                    resolve({ message: `${SUCCESS_MSG.USER_LOGIN}`, data: user });
                } else {
                    reject({ message: `${ERROR_MSG.USER_LOGIN}` });
                }
            }, err => {
                console.log(`AUDT:Login - ${data.email}; ${err.message} : ${new Date()};ERROR`);
                reject({ message: `${ERROR_MSG.USER_LOGIN}` });
            });
        });
    }
}

const Auth_Service = new AuthService();
export default Auth_Service;