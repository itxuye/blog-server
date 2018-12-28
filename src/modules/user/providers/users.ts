import { Injectable } from "@graphql-modules/di";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../../typings/generated-models";
import UserEntity from "../../../entity/User";
@Injectable()
export class Users {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}
  getUser(username: string) {
    return this.userRepository.findOne(username);
  }

  allUsers() {
    return this.userRepository.find();
  }

  async createUser(user: any): Promise<User> {
    const userResult = await this.userRepository.save(user);
    // console.log(user);
    return userResult;
  }
}
