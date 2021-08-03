import { TaskController } from '../controllers/index';

export default class TaskRoutes {

    constructor(app: any) {
       this.setupRoutes(app);
    }

    private setupRoutes(app): void {
      app.post(`/spak/tasks`, TaskController.setupTask);
      app.get(`/spak/tasks/:id`, TaskController.retrieveTasks);
      app.delete(`/spak/task/:id`, TaskController.deleteTask);
    }
}