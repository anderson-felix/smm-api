import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/user/CreateUserService';
import SessionUserService from '@modules/user/services/user/SessionUserService';
import ListUsersService from '@modules/user/services/user/ListUsersService';
import DeleteUserService from '@modules/user/services/user/DeleteUserService';
import ShowProfileService from '@modules/user/services/user/ShowProfileService';
import UpdateUserService from '@modules/user/services/user/UpdateUserService';

export default class UserController {
  public static async session(req: Request, res: Response): Promise<Response> {
    const authenticateAdmin = container.resolve(SessionUserService);

    const response = await authenticateAdmin.execute(req.body);

    return res.json(response);
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(req.body);

    return res.json(user);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user: req.user,
      ...req.body,
    });

    return res.json(user);
  }

  public static async list(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const user = await listUsers.execute(req.paging);

    return res.json(user);
  }

  public static async profile(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(req.user);
    return res.json(user);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(req.user);

    return res.sendStatus(204);
  }
}
