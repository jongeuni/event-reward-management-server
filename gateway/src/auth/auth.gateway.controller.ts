import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignInRq } from './rqrs/sign-in.rq';
import { SignInRs } from './rqrs/sign-in.rs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AUTH_SERVER } from '../common/constants/constants';

@ApiTags('Auth Controller - 로그인')
@Controller('/v1/auth')
export class AuthGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '로그인 API',
    description: '로그인을 하고 토큰을 발급합니다. - 기본 어드민: admin01',
  })
  @Post('/login')
  async signIn(@Body() rq: SignInRq): Promise<SignInRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignInRs>(`${AUTH_SERVER}/sign-in`, rq),
    );
    return response.data;
  }
}
