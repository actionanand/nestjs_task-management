import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServ: AuthService) {}

  @Post('/signup')
  onSignUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return this.authServ.signUp(authCredentials);
  }
}
