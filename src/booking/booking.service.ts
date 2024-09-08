import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto';
import { PrismaService } from 'src/prisma.service';
import { createSuccessResponse } from '../../libs/helpers/api-response.helpers';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async add(createBookingDto: CreateBookingDto, userId: number) {
    const { merchantId, amount, status } = createBookingDto;

    try {
      const booking = await this.prisma.booking.create({
        data: {
          amount: amount,
          status: status,
          merchantId: merchantId,
          userId: userId,
        },
      });

      return createSuccessResponse({
        message: 'Booking created successfully',
        booking: { ...booking },
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to create booking');
    }
  }

  async getAllBookings() {
    try {
      const getAllMerchants = await this.prisma.booking.findMany({
        select: {
          id: true,
          status: true,
          amount: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          merchant: true,
        },
      });
      return createSuccessResponse({
        bookings: getAllMerchants,
        totalBookings: getAllMerchants.length,
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to get bookind records');
    }
  }

  async getBookingById(bookingId: number) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          merchant: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          payment: {
            select: {
              id: true,
              amount: true,
              status: true,
              paymentMethod: true,
            },
          },
          review: {
            select: {
              id: true,
              rating: true,
              comment: true,
            },
          },
        },
      });
      return createSuccessResponse({
        bookingDetails: booking,
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to get booking with id');
    }
  }

  async changeBookingStatus(
    id: number,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    try {
      const updatedUser = await this.prisma.booking.update({
        where: {
          id: id,
        },
        data: {
          status: updateBookingStatusDto.status,
        },
      });
      return createSuccessResponse({
        message: 'Booking status updated successfully',
        booking: { ...updatedUser },
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to update booking status');
    }
  }
}
