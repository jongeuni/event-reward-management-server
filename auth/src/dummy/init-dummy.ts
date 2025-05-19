import { INestApplication } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import * as bcrypt from 'bcrypt';

export async function initDummy(app: INestApplication) {
  const userRepository = app.get(UserRepository);

  if (await userRepository.userModel.exists({ role: 'ADMIN' })) {
    console.log(
      '이미 어드민 계정이 존재하므로 어드민 계정 데이터 삽입을 건너뜁니다.\n' +
        '기본 생성되는 admin email과 password는 admin01입니다.',
    );
    return;
  }

  await userRepository.create({
    name: '어드민 1',
    email: 'admin01',
    password: await bcrypt.hash('admin01', 10),
    role: 'ADMIN',
  });

  console.log('email: admin01 / password: admin01 어드민 계정 생성');
}