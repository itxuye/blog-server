import {
  IsNotEmpty,
  IsString,
  NotEquals,
  Max
} from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  @NotEquals('')
  @IsString()
  @Max(30)
  readonly name: string;
}
