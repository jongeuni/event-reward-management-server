import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRs } from '../auth/rqrs/sign-up.rs';
import { UserCreateRq } from '../auth/rqrs/user-create.rq';
import { UserRole } from '../auth/rqrs/user-role';
import { AuthRoleGuard } from '../common/auth/auth-role.guard';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { AUTH_SERVER } from '../common/config/constants';
import { ApiTags } from '@nestjs/swagger';

// FIXME
@ApiTags('Admin Controller - 사용자(관리자) 생성')
@Controller('/v1/admin')
export class AdminGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/users')
  @AuthRoleGuard(UserRole.ADMIN)
  async userCreate(
    @Body() rq: UserCreateRq,
    @CurrentUserHeader() headers: RequestHeader,
  ): Promise<SignUpRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignUpRs>(`${AUTH_SERVER}/admin/users`, rq, {
        headers,
      }),
    );
    return response.data;
  }
}
