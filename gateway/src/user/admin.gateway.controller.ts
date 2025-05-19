import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRs } from '../auth/rqrs/sign-up.rs';
import { UserCreateRq } from './rqrs/user-create.rq';
import { UserRole } from '../auth/rqrs/user-role';
import { AuthRoleGuard } from '../common/auth/auth-role.guard';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { AUTH_SERVER } from '../common/config/constants';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChargeCashRs } from '../wallet/rqrs/charge-cash.rs';

// FIXME
@ApiBearerAuth('Access-Token')
@ApiTags('Admin Controller - 사용자(관리자) 생성')
@Controller('/v1/admin')
export class AdminGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '사용자(관리자) 생성 API',
    description:
      '어드민이 사용자, 관리자를 생성합니다. password는 동일하게 생성됩니다. 공통 비밀번호: pw1234',
  })
  @ApiCreatedResponse({
    type: ChargeCashRs,
  })
  @AuthRoleGuard(UserRole.ADMIN)
  @Post('/users')
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
