import { Inject, forwardRef, HttpException } from '@nestjs/common';
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
      throw new HttpException('登录失败，用户不存在', 401);
    }

    const isValidPassword: boolean = await this.usersService.validatePassword(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      throw new HttpException('登录失败，密码错误', 401);
    }

    return await this.authService.createToken(user.id);
  }

  @Query()
  async refresh(obj, args) {
    return await this.authService.refreshToken(args.refreshToken);
  }
}
