import { IsLowercase, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  @IsLowercase()
  username: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  password: string;
}
