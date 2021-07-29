import { Request, Response } from 'express';
import { TaskService } from '../services/index';

class TaskController {
    // configure the tasks
    setupTask(req: Request, resp: Response) {
        if (req.body.id) {
            TaskService.modify(req.body).then(
                data =>
                    // handle success and return task data to client
                    resp.status(201).send(data)
                , err => {
                    // handle error
                    resp.status(500).send(err);
                });
        } else {
            TaskService.create(req.body).then(
                data =>
                    // handle success and return task data to client
                    resp.status(201).send(data)
                , err => {
                    // handle error
                    resp.status(500).send(err);
                });
        }

    }

    // retrieve the configured task
    retrieveTasks(req: Request, resp: Response) {
        TaskService.getAll().then(data =>
            // handle success and return task data to client
            resp.status(200).send(data)
            , err => {
                // handle error
                resp.status(500).send(err);
            });
    }

    // soft delete the configured task
    deleteTask(req: Request, resp: Response) {
        TaskService.delete(+req.params.id).then(data =>
            // handle success and return task data to client
            resp.status(201).send(data)
            , err => {
                // handle error
                resp.status(500).send(err);
            });
    }
}
const controller = new TaskController();
export default controller;