'use strict';

import { Project } from '.prisma/client';
import { isValidNumericId } from '../utils/validators';
import ProjectRepositroy from '../repositories/projectRepository';
import InvalidArgumentError from '../data/errors/invalidArgumentError';
import InvalidNumericIdError from '../data/errors/invalidNumericIdError';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';
import { ICreateProjectData, IUpdateProjectData } from '../data/types/repository';

class ProjectService {
  private readonly repository: ProjectRepositroy;

  constructor(repository: ProjectRepositroy) {
    this.repository = repository;
  }

  public async create(data: ICreateProjectData): Promise<void> {
    await this.repository.create(data);
  }

  public async getById(id: number): Promise<Project> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    const project = await this.repository.findById(id);

    if (!project) throw ResourceNotFoundError;
    return project;
  }

  public async getMany(ids: number[]) {
    const validIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validIds.push(id);
    }
    if (validIds.length === 0) throw InvalidArgumentError;

    const collection = await this.repository.findMany(validIds);
    return collection;
  }

  public async getManyByUserId(userId: number): Promise<Project[]> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const collection = await this.repository.findManyByUserId(userId);
    return collection;
  }

  public async update(id: number, data: IUpdateProjectData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    await this.repository.update(id, data);
  }

  public async updateMany(ids: number[], collection: IUpdateProjectData[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const validatedIdCollection: number[] = [];
    const validatedPayloadCollection: IUpdateProjectData[] = [];

    for (let iterator = 0; iterator < ids.length; ++iterator) {
      if (isValidNumericId(ids[iterator])) {
        validatedIdCollection.push(ids[iterator]);
        validatedPayloadCollection.push(collection[iterator]);
      }
    }

    await this.repository.updateMany(validatedIdCollection, validatedPayloadCollection);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    await this.repository.delete(id);
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const validatedIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validatedIds.push(id);
    }

    await this.repository.deleteMany(validatedIds);
  }
}

export default ProjectService;
