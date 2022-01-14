'use strict';

import { Project, Prisma } from '.prisma/client';
import { ICreateProjectData } from '../data/types/createTypes';
import { IUpdateProjectData } from '../data/types/updateTypes';

class ProjectRepositroy {
  private readonly delegate: Prisma.ProjectDelegate<false>;

  constructor(delegate: Prisma.ProjectDelegate<false>) {
    this.delegate = delegate;
  }

  public async create(data: ICreateProjectData) {
    const queryResult = await this.delegate.create({ data });
    return queryResult;
  }

  public async findById(id: number): Promise<Project | null> {
    const queryResult = await this.delegate.findUnique({ where: { id } });
    return queryResult;
  }

  public async findMany(ids: number[]): Promise<Project[]> {
    const actionResult = [];

    for (const id of ids) {
      const queryResult = await this.delegate.findUnique({ where: { id } });
      if (queryResult) actionResult.push(queryResult);
    }

    return actionResult;
  }

  public async findManyByUserId(userId: number): Promise<Project[]> {
    const queryResult = await this.delegate.findMany({ where: { userId } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateProjectData): Promise<Project> {
    const queryResult = await this.delegate.update({ where: { id }, data });
    return queryResult;
  }

  public async updateMany(ids: number[], collection: IUpdateProjectData[]): Promise<Project[]> {
    let index = 0;
    const queryResultCollection: Project[] = [];

    while (index < ids.length) {
      const queryResult = await this.delegate.update({ where: { id: ids[index] }, data: collection[index] });
      queryResultCollection.push(queryResult);
      ++index;
    }
    return queryResultCollection;
  }

  public async delete(id: number): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    while (index < ids.length) {
      await this.delegate.delete({ where: { id: ids[index] } });
      ++index;
    }
  }
}

export default ProjectRepositroy;
