import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty.' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @IsString()
  @IsOptional()
  qrCode: string;
}
