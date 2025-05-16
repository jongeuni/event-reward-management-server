import { BadRequestException, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { SignUpRq } from '../controller/rqrs/sign-up.rq';
import { SignUpRs } from '../controller/rqrs/sign-up.rs';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user';
import * as bcrypt from 'bcrypt';
import { SignInRq } from '../controller/rqrs/sign-in.rq';
import { SignInRs } from '../controller/rqrs/sign-in.rs';
import { JwtUtil } from '../../auth/jwt/jwt.util';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(private readonly accountRepository: UserRepository,
              private readonly jwtUtil: JwtUtil) {}

  async signUp(rq: SignUpRq): Promise<SignUpRs> {
    console.log(rq)

    const user: User =  await this.accountRepository.create({
      email: rq.email,
      name: rq.nickname,
      password: await bcrypt.hash(rq.password, 10),
      role: "USER"
    });

    return {
      nickname: user.name,
      email: user.email,
      role: user.role,
      ...await this.jwtUtil.createJwtToken(user._id, user.email, user.role)
    }
  }

  async signIn(rq: SignInRq): Promise<SignInRs> {
    const user = await this.accountRepository.findByEmail(rq.email);

    if(!user) {
      throw new NotFoundException("user not found");
    }

    if(!await bcrypt.compare(rq.password, user.password)) {
      throw new BadRequestException("password not matched");
    }

    return {
      ...await this.jwtUtil.createJwtToken(user._id, user.email, user.role)
    }
  }
}