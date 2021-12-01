'use strict';

import { IRepository, ICreateUserArgs, IUpdateUserArgs, IRepositoryConstructor } from '../data/interfaces/repository';
import { PartialUser } from '../data/types/partialUser';
import { Prisma, PrismaClient, User } from '.prisma/client';

class UserRepository implements IRepository<ICreateUserArgs, User, IUpdateUserArgs> {
  private readonly context: PrismaClient;
  private readonly table: Prisma.UserDelegate<false>;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
    this.table = this.context.user;
  }

  public createPartialUser(user: User): PartialUser {
    const partialUser: PartialUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      disabledAt: user.disabledAt,
      disabledBy: user.disabledBy,
    };
    return partialUser;
  }

  public async create(args: ICreateUserArgs): Promise<void> {
    await this.table.create({ data: args });
  }

  public async findById(id: number): Promise<User | null> {
    const queryResult = await this.table.findUnique({ where: { id } });
    return queryResult;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const queryResult = await this.table.findUnique({ where: { email } });
    return queryResult;
  }

  public async update({ id, data }: { id: number; data: IUpdateUserArgs }): Promise<void> {
    await this.table.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.table.delete({ where: { id } });
  }
}

export default UserRepository;
