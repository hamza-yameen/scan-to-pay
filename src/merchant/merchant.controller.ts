import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto, UpdateMerchantDto } from './dto';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('/add')
  addMerchant(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.add(createMerchantDto);
  }

  @Patch(':id')
  updateQrCode(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.updateQrCode(+id, updateMerchantDto.qrCode);
  }

  @Get()
  getAllMerchants() {
    return this.merchantService.getAllMerchant();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.merchantService.getOne(+id);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(+id);
  }
}
