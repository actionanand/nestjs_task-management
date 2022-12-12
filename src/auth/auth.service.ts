import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

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

    try {
      await this.userRepo.save(user);
    } catch (err) {
      if (+err.code === 23505) {
        // sql error code 23505 -> duplicate value (i.e, username)
        throw new ConflictException(`Username '${username}' already exist.`);
      } else {
        throw new InternalServerErrorException(
          'Oops!, unable to create a user, Please try after sometime.',
        );
      }
    }
  }
}
