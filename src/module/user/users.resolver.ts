import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(AuthGuard)
  public async user() {
    return await this.usersService.findOne();
  }

  // @Mutation()
  // @UseGuards(AuthGuard)
  // public async createUser(@Args('userInput') userInput: UserPayload) {
  //   return this.usersService.create(userInput);
  // }
}
