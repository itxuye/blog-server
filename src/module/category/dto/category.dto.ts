import { IsNotEmpty, IsString, NotEquals, Max } from 'class-validator';
export class CreateCategory {
  @IsNotEmpty()
  @NotEquals('')
  @IsString()
  @Max(30)
  readonly name: string;
}

export class FindCategory {
  @IsString()
  readonly pageSize?: string;
  @IsString()
  readonly page?: string;
}
