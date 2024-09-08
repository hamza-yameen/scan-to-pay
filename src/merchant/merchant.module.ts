import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService, PrismaService],
})
export class MerchantModule {}
