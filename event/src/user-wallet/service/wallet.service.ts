import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../repository/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async chargeCash(userId: string, amount: number) {
    const balance = await this.walletRepository.chargeCash(userId, amount);
    return {
      balance,
    };
  }
}
