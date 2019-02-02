import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserPayload } from './interfaces/user.interface';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async user(obj, args, ctx, info) {
    console.log(ctx)
    let id = args.id;

    if (!args.id) {
      if (!ctx.userData) {
        throw new Error('Unauthorized');
      }

      id = ctx.userData.userId;
    }

    return await this.usersService.findOne(id);
  }

  @Mutation()
  // @UseGuards(AuthGuard)
  async createUser(obj, userPayload: UserPayload, ctx, info) {
    console.log(1111111)
    console.log(userPayload,ctx.userData.userId);
    return await this.usersService.create(userPayload);
  }
}
