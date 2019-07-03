import { Category as CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService]
})
export class CategoryModule {}
