'use strict';

import { Project, Prisma } from '.prisma/client';
import { CreateProjectData } from '../types/createModels';
import { UpdateProjectData } from '../types/updateModels';

class ProjectRepositroy {
  private readonly context: Prisma.ProjectDelegate<false>;

  constructor(context: Prisma.ProjectDelegate<false>) {
    this.context = context;
  }

  public async create(data: CreateProjectData) {
    const queryResult = await this.context.create({ data });
    return queryResult;
  }

  public async findById(id: number): Promise<Project | null> {
    const queryResult = await this.context.findUnique({ where: { id } });
    return queryResult;
  }

  public async findMany(ids: number[]): Promise<Project[]> {
    const actionResult = [];

    for (const id of ids) {
      const queryResult = await this.context.findUnique({ where: { id } });
      if (queryResult) actionResult.push(queryResult);
    }

    return actionResult;
  }

  public async findCountByUserId(userId: number): Promise<number> {
    const queryResult = await this.context.count({ where: { userId } });
    return queryResult;
  }

  public async findManyByUserId(userId: number): Promise<Project[]> {
    const queryResult = await this.context.findMany({ where: { userId } });
    return queryResult;
  }

  public async update(id: number, data: UpdateProjectData): Promise<Project> {
    const queryResult = await this.context.update({ where: { id }, data });
    return queryResult;
  }

  public async updateMany(ids: number[], collection: UpdateProjectData[]): Promise<Project[]> {
    let index = 0;
    const queryResultCollection: Project[] = [];

    while (index < ids.length) {
      const queryResult = await this.context.update({ where: { id: ids[index] }, data: collection[index] });
      queryResultCollection.push(queryResult);
      ++index;
    }
    return queryResultCollection;
  }

  public async delete(id: number): Promise<void> {
    await this.context.delete({ where: { id } });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    while (index < ids.length) {
      await this.context.delete({ where: { id: ids[index] } });
      ++index;
    }
  }
}

export default ProjectRepositroy;
