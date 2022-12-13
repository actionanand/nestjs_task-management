import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(350)
  description: string;
}
