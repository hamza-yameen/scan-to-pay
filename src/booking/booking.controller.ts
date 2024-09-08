import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto';
import { Authorized, CurrentUser } from '../../libs/decorators';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Authorized()
  @Post('/add')
  addBooking(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser() user: any,
  ) {
    return this.bookingService.add(createBookingDto, user.id);
  }

  @Authorized()
  @Get('/all')
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Authorized()
  @Get(':id')
  findBookingById(@Param('id') id: string) {
    return this.bookingService.getBookingById(+id);
  }

  @Authorized()
  @Patch(':id/status')
  changeBookingStatus(
    @Param('id') id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.changeBookingStatus(+id, updateBookingStatusDto);
  }
}
