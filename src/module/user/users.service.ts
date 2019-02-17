import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { User as UserEntity } from './users.entity';
import { IUser, IUserPayload } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async findOne(
    findOptions?: FindOneOptions<UserEntity>
  ): Promise<IUser | undefined> {
    return this.usersRepository.findOne(findOptions);
  }

  async find(findOptions?: FindManyOptions<UserEntity>): Promise<IUser[]> {
    return this.usersRepository.find(findOptions);
  }

  async create(userPayload: IUserPayload): Promise<IUser> {
    const duplicateUser = await this.findOne({
      where: { username: userPayload.username }
    });

    if (duplicateUser) {
      throw new Error('Duplicate User');
    }

    const newUser = new UserEntity();

    newUser.username = userPayload.username;
    newUser.passwordHash = await this.hashPassword(userPayload.password);

    return this.usersRepository.save(newUser);
  }
}
