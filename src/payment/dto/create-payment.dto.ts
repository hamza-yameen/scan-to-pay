import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  CRYPTO = 'CRYPTO',
  SN_BALANCE = 'SN_BALANCE',
  GBP_WALLET = 'GBP_WALLET',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class CreatePaymentDto {
  @IsInt()
  @IsNotEmpty()
  bookingId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentMethod, {
    message: 'Payment method must be a valid enum value.',
  })
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsEnum(PaymentStatus, {
    message: 'Payment status must be a valid enum value.',
  })
  @IsNotEmpty()
  status: PaymentStatus;
}
