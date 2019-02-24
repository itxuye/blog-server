import { IsString } from 'class-validator';

export class TagDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly slug: string;

  readonly description: string;
}
