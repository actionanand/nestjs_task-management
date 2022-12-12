import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = this.userRepo.create({
      username,
      password,
    });

    await this.userRepo.save(user);
  }
}
