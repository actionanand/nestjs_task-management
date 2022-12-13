import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm/repository/Repository';

import { JwtPayload } from './auth.model';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private configServ: ConfigService,
  ) {
    super({
      secretOrKey: configServ.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }); // 'JwtStrategy' is a derived class of 'PassportStrategy', so super should be called.
  }

  async validate({ username }: JwtPayload): Promise<User> {
    const foundUser: User = await this.userRepo.findOne({
      where: { username },
    });

    if (!foundUser) {
      throw new UnauthorizedException(`Unauthorized!, User not found.`);
    }

    return foundUser;
  }
}
