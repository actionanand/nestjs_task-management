import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signUp({
    username,
    password: rawPassword,
  }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(rawPassword, salt);

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

  async signIn({ username, password }: AuthCredentialsDto): Promise<string> {
    const foundUser = await this.userRepo.findOne({ where: { username } });

    if (!foundUser) {
      throw new UnauthorizedException(
        `User with '${username}' not found!, Please signup.`,
      );
    }

    const isPassRight = await bcrypt.compare(password, foundUser.password);

    if (isPassRight) {
      return 'User logged In successfully!';
    }

    throw new UnauthorizedException('Please check your password!');
  }
}
