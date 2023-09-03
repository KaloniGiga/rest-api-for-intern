import User from '../models/user.model';

export class UserService {
  //find the user by given id
  async findUserById(id: number) {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  //find the user by given email
  async findUserByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  async createUser(name: string, email: string, phone: string) {
    const user = await User.create({
      name,
      email,
      phone,
    });

    return user;
  }
}

export const userService = new UserService();
