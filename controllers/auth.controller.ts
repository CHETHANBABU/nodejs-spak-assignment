import { Request, Response } from 'express';
import { AuthService } from '../services/index';

class AuthController {
    // user registeration
    register(req: Request, resp: Response) {
        AuthService.register(req.body).then(
            data =>
                // handle success
                resp.status(201).send(data)
            , err => {
                // handle error
                resp.status(500).send(err);
            });
    }

    // user login
    login(req: Request, resp: Response) {
        AuthService.login(req.body).then(
            data =>
                // handle success
                resp.status(201).send(data)
            , err => {
                // handle error
                resp.status(500).send(err);
            });
    }
}

const controller = new AuthController();
export default controller;