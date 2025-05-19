import { Controller, Post, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/config/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';

@ApiTags('Attendance Controller - 유저 출석')
@Controller('/v1')
export class WalletGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '출석 체크 API',
    description: '당일 출석 체크를 합니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/attendances')
  async attendanceCheck(@CurrentUserHeader() headers: RequestHeader) {
    await firstValueFrom(
      this.httpService.post(`${EVENT_SERVER}/attendances`, {
        headers,
      }),
    );
  }
}
