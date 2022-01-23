import 'reflect-metadata';
import { Request, Response } from 'express';
import container from '../../../config/ioc/installer';
import { UserService } from '../../application/UserService';

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = container.resolve<UserService>(UserService);
    }

    public async getUsers(req: Request, res: Response) {
        const list = await this.userService.getAllUsers();
        res.status(200).json(list);
    }
}
