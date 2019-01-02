import { Injectable } from "@graphql-modules/di";
import { Repository, getRepository } from "typeorm";
import { User } from "../../../typings/generated-models";
import UserEntity from "../../../entity/User";
@Injectable()
export class Users {
  private readonly userRepository: Repository<UserEntity>;
  constructor() {
    this.userRepository = getRepository(UserEntity);
  }
  async allUsers() {
    const userResult = await this.userRepository.find();
    return userResult;
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
