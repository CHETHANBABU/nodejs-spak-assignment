import { AuthController } from '../controllers/index';

export default class AuthRoutes {

    constructor(app: any) {
       this.setupRoutes(app);
    }

    private setupRoutes(app): void {
      app.post(`/spak/register`, AuthController.register);
      app.post(`/spak/login`, AuthController.login);
    }
}