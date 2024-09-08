import { IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export enum BookingStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
}

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Merchant should not be empty.' })
  merchantId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Amount should not be empty.' })
  amount: number;

  @IsEnum(BookingStatus, { message: 'Status must be a valid enum value.' })
  @IsNotEmpty({ message: 'Status should not be empty.' })
  status: BookingStatus;
}
