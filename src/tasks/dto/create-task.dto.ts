import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  title: string;

  @IsNotEmpty()
  @MinLength(7)
  description: string;
}
