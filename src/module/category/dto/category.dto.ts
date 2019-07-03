import {
  IsNotEmpty,
  IsString,
  NotEquals,
  Max,
  IsNumber
} from 'class-validator';
export class CreateCategory {
  @IsNotEmpty()
  @NotEquals('')
  @IsString()
  @Max(30)
  readonly name: string;
}

export class FindCategory {
  @IsNumber()
  readonly pageSize?: number;
  @IsNumber()
  readonly page?: number;
}
