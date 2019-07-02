import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
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
  readonly tagId: number[];

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: string;
}