import { TaskModel } from '../models/index';
import { ERROR_MSG, SUCCESS_MSG } from '../utils/messages.constants';
class TaskService {
    create(data: any) {
        return new Promise((resolve, reject) => {
            const model = TaskModel.build(data);
            model.save().then(data =>
                resolve({ message: `${SUCCESS_MSG.TASK_CREATE}`, data: data })
                , err => {
                    // handle error
                    console.log(`AUDT:Task create - ${data.name}; ${err.message} : ${new Date()};ERROR`);
                    reject({ message: `${ERROR_MSG.TASK_CREATE}` });
                });
        });
    }

    modify(data: any) {
        return new Promise((resolve, reject) => {
            const model = TaskModel.build(data);
            model.isNewRecord = false;
            model.save().then(data =>
                resolve({ message: `${SUCCESS_MSG.TASK_CREATE}`, data: data })
                , err => {
                    // handle error
                    console.log(`AUDT:Task update - ${data.name}; ${err.message} : ${new Date()};ERROR`);
                    reject({ message: `${ERROR_MSG.TASK_CREATE}` });
                });
        });
    }

    // return all tasks - isDelete: false 
    getAll(): any {
        return new Promise((resolve, reject) => {
            TaskModel.findAll({ where: { isDeleted: false } }).then((_tasks: any) => {
                resolve({ data: _tasks });
            }, err => {
                // handle error
                console.log(`AUDT:Task retrieve - ${err.message} : ${new Date()};ERROR`);
                reject({ message: `${ERROR_MSG.TASK_RETRIEVE_ALL}` });
            });
        });
    }

    // delete the specified task by id - isDelete: true
    delete(id: any): any {
        return new Promise((resolve, reject) => {
            TaskModel.update({
                isDeleted: true
            }, { where: { id: id } }).then(_service => {
                resolve({ message: `${SUCCESS_MSG.TASK_DELETE}`, data: id })
            }, err => {
                // handle error
                console.log(`AUDT:Task delete - ${err.message} : ${new Date()};ERROR`);
                reject({ message: `${ERROR_MSG.TASK_DELETE}` });
            })
        });
    }
}
const Task_Service = new TaskService();
export default Task_Service;
