import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMerchantDto {
  @IsString()
  @IsNotEmpty({ message: 'QR Code should not be empty.' })
  qrCode: string;
}
