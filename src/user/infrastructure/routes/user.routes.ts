import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/list', (req: Request, res: Response) => userController.getUsers(req, res));

export default userRoutes;
