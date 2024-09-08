import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePaymentDto } from './dto';
import { createSuccessResponse } from '../../libs/helpers/api-response.helpers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { bookingId, amount, paymentMethod, status } = createPaymentDto;
    try {
      const paymentProcess = await this.prisma.payment.create({
        data: {
          bookingId: bookingId,
          amount: amount,
          paymentMethod: paymentMethod,
          status: status,
        },
      });

      return createSuccessResponse({
        message: 'Payment successfully',
        payment: { ...paymentProcess },
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to create booking');
    }
  }

  async update(createPaymentDto: CreatePaymentDto) {
    const { bookingId, amount, paymentMethod, status } = createPaymentDto;
    try {
      const paymentProcess = await this.prisma.payment.create({
        data: {
          bookingId: bookingId,
          amount: amount,
          paymentMethod: paymentMethod,
          status: status,
        },
      });

      return createSuccessResponse({
        message: 'Payment successfully',
        payment: { ...paymentProcess },
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to create booking');
    }
  }

  async getPaymentDetailByBookingId(bookingId: number) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
        include: {
          payment: {
            select: {
              id: true,
              amount: true,
              status: true,
              paymentMethod: true,
            },
          },
        },
      });
      return createSuccessResponse({
        booking: booking,
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to get payment detail with id');
    }
  }
}
