import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { SignUpRq } from '../controller/rqrs/sign-up.rq';
import { SignUpRs } from '../controller/rqrs/sign-up.rs';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user';
import * as bcrypt from 'bcrypt';
import { SignInRq } from '../controller/rqrs/sign-in.rq';
import { SignInRs } from '../controller/rqrs/sign-in.rs';
import { JwtUtil } from '../../auth/jwt/jwt.util';
import { CreateUserRq } from '../controller/rqrs/create-user.rq';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    private readonly accountRepository: UserRepository,
    private readonly jwtUtil: JwtUtil,
  ) {}

  DEFAULT_PASSWORD = 'pw1234';

  async signUp(rq: SignUpRq): Promise<SignUpRs> {
    const user: User = await this.accountRepository.create({
      email: rq.email,
      name: rq.name,
      password: await bcrypt.hash(rq.password, 10),
      role: 'USER',
    });

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      ...(await this.jwtUtil.createJwtToken(
        user._id.toString(),
        user.email,
        user.role,
      )),
    };
  }

  async signIn(rq: SignInRq): Promise<SignInRs> {
    const account = await this.accountRepository.findByEmail(rq.email);

    if (!account) {
      throw new NotFoundException('account not found');
    }

    if (!(await bcrypt.compare(rq.password, account.password))) {
      throw new BadRequestException('password not matched');
    }

    return {
      ...(await this.jwtUtil.createJwtToken(
        account._id.toString(),
        account.email,
        account.role,
      )),
    };
  }

  async createUser(rq: CreateUserRq) {
    const user: User = await this.accountRepository.create({
      email: rq.email,
      name: rq.name,
      password: await bcrypt.hash(this.DEFAULT_PASSWORD, 10),
      role: rq.role,
    });
    return {
      id: user._id.toString(),
    };
  }
}