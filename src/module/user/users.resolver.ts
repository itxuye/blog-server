import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  IUpdateUserPayload,
  IUpdateUser
} from './interfaces/user.interface';
@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(AuthGuard)
  public async user() {
    return await this.usersService.findOne();
  }

  @Mutation()
  @UseGuards(AuthGuard)
  public async updateUser(
    @Args('userInput') userInput: IUpdateUserPayload
  ): Promise<IUpdateUser> {
    return this.usersService.update(userInput);
  }
}
