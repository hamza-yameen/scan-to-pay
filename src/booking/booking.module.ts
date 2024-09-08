import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule, TokenService } from '../../libs/modules/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BookingController],
  providers: [BookingService, PrismaService, TokenService],
})
export class BookingModule {}
