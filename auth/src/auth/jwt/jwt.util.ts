import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRole } from '../../user/schema/user-role';
import { SECRET_KEY } from '../../common/constants/constants';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  private readonly access_secret_key = SECRET_KEY;
  private readonly refresh_secret_key = SECRET_KEY;
  private readonly access_expires_in = '1440m';
  private readonly refresh_expires_in = '10080m';

  async createJwtToken(id: string, email: string, role: UserRole) {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(id, email, role),
      this.createRefreshToken(id, email, role),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private createAccessToken(id: string, email: string, role: UserRole): string {
    return this.jwtService.sign(
      {
        id,
        email,
        role,
        type: 'ACCESS_TOKEN',
      },
      {
        secret: this.access_secret_key,
        expiresIn: this.access_expires_in,
        subject: 'access',
      },
    );
  }

  private createRefreshToken(
    id: string,
    email: string,
    role: UserRole,
  ): string {
    return this.jwtService.sign(
      {
        id,
        email,
        role,
        type: 'REFRESH_TOKEN',
      },
      {
        secret: this.refresh_secret_key,
        expiresIn: this.refresh_expires_in,
        subject: 'refresh',
      },
    );
  }
}