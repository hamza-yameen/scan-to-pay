import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from './create-booking.dto';

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus, { message: 'Status must be a valid enum value.' })
  @IsNotEmpty({ message: 'Status should not be empty.' })
  status: BookingStatus;
}
