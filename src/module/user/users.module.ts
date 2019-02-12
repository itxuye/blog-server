import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User as UserEntity } from './users.entity';

import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolver';

import { authConfig } from '../../config';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  private async initUser() {
    const username: any = authConfig.DEFAULT_USERNAME;
    const user = await this.userService.findOne({
      where: { username },
    });
    if (!user) {
      await this.userService.create({
        username: authConfig.DEFAULT_USERNAME,
        password: authConfig.DEFAULT_PASS,
      });
    }
  }

  public async onModuleInit() {
    await this.initUser();
  }
}
