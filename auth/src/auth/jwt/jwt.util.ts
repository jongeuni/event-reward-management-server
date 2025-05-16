import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRole } from '../../user/user-role';
import { ObjectId } from 'mongoose';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  private readonly access_secret_key = 'test';
  private readonly refresh_secret_key = 'test';
  private readonly access_expires_in = '5m';
  private readonly refresh_expires_in = '5m';

  async createJwtToken(id: ObjectId, email: string, role: UserRole) {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(id, email, role),
      this.createRefreshToken(id, email, role)
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private createAccessToken(id: ObjectId, email: string, role: UserRole): string {
    return this.jwtService.sign(
      {
        id,
        email,
        role
      },
      {
        secret: this.access_secret_key,
        expiresIn: this.access_expires_in,
        subject: 'access'
      }
    );
  }

  private createRefreshToken(id: ObjectId, email: string, role: UserRole): string {
    return this.jwtService.sign(
      {
        id,
        email,
        role
      },
      {
        secret: this.refresh_secret_key,
        expiresIn: this.refresh_expires_in,
        subject: 'refresh'
      }
    );
  }
}