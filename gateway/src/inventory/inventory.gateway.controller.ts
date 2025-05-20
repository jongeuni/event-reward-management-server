import { Controller, Get, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/constants/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { SuccessRs } from '../common/rs/success.rs';
import { JwtAuthGuard } from '../common/auth/guard/jwt-auth.guard';

@ApiBearerAuth('Access-Token')
@ApiTags('Inventory Controller - 사용자 인벤토리 조회')
@Controller('/v1/inventories')
export class InventoryGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '인벤토리 조회 API',
    description: '인벤토리에 있는 아이템들을 조회합니다.',
  })
  @ApiResponse({ type: SuccessRs })
  @Get()
  @UseGuards(JwtAuthGuard)
  // 미개발
  async readInventory(@CurrentUserHeader() headers: RequestHeader) {
    await firstValueFrom(
      this.httpService.get<SuccessRs>(`${EVENT_SERVER}/inventories`, {
        headers,
      }),
    );
  }
}
