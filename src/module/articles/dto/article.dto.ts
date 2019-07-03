import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly tagsId: number[];

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class FindArticles {
  @IsNumber()
  readonly pageSize?: number;
  @IsNumber()
  readonly page?: number;
  @IsString()
  readonly search?: string;
}
