import { Inject, forwardRef } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';

@Resolver('Auth')
export class AuthResolvers {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Query()
  async login(@Args('username') username, @Args('password') password) {
    const user = await this.usersService.findOne({
      where: { username }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword: boolean = await this.usersService.validatePassword(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return new Error('Password invalid');
    }

    return await this.authService.createToken(user.id);
  }

  @Query()
  async refresh(obj, args) {
    return await this.authService.refreshToken(args.refreshToken);
  }
}
