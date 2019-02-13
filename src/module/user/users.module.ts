import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User as UserEntity } from './users.entity';

import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolver';

import config from '../../envconfig';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  private async initUser() {
    const username: any = config.DEFAULT_USERNAME;
    const user = await this.userService.findOne({
      where: { username },
    });
    if (!user) {
      await this.userService.create({
        username: config.DEFAULT_USERNAME,
        password: config.DEFAULT_PASSWORD,
      });
    }
  }

  public async onModuleInit() {
    await this.initUser();
  }
}
