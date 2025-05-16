import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepositoryModule } from './repository/user.repository.module';
import { JwtModule } from '../auth/jwt/jwt.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    UserRepositoryModule,
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
