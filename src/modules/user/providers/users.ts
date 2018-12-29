import { Injectable } from "@graphql-modules/di";
import { Repository, getManager } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../../typings/generated-models";
import UserEntity from "../../../entity/User";
@Injectable()
export class Users {
  constructor() // @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  {}

  async allUsers() {
    const userRepository = getManager().getRepository(UserEntity);
    const userResult = await userRepository.find();
    return userResult;
  }

  async createUser(user: any): Promise<any> {
    const userRepository = getManager().getRepository(UserEntity);
    return await userRepository
      .createQueryBuilder("user")
      .insert()
      .into(UserEntity)
      .values([
        {
          ...user
        }
      ])
      .execute();
  }
}
