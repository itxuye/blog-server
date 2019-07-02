import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // you can use provider import other service into related module
  providers: [CategoryService], // provide service module
  exports: [CategoryService]
})
export class CategoryModule {}
