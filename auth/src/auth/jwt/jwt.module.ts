import { Module } from '@nestjs/common';
import { JwtUtil } from './jwt.util';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [JwtUtil, JwtService],
  exports: [JwtUtil, JwtService]
})
export class JwtModule {}