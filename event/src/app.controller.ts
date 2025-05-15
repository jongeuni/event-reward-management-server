import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  @MessagePattern({ cmd: 'sum' })
  getHello(): string {
    //test
    return this.appService.getHello();
  }
}
