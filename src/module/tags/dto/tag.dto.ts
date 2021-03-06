import {
  IsNotEmpty,
  IsNumber,
  IsString,
  NotEquals,
  Max
} from 'class-validator';
export class TagDto {
  readonly id: number;
  readonly name: string;
  readonly articles: any[];
}
export class CreateTagDto {
  @IsNotEmpty()
  @NotEquals('')
  @IsString()
  @Max(30)
  readonly name: string;
}
