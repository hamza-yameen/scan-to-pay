import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMerchantDto } from './dto';
import { PrismaService } from '../prisma.service';
import { createSuccessResponse } from '../../libs/helpers/api-response.helpers';

@Injectable()
export class MerchantService {
  constructor(private prisma: PrismaService) {}

  async add(createMerchantDto: CreateMerchantDto) {
    const { name, email, qrCode } = createMerchantDto;
    try {
      const addMerchant = await this.prisma.merchant.create({
        data: {
          name: name,
          email: email,
          qrCode: qrCode || null,
        },
      });
      return createSuccessResponse({
        message: 'Merchant created successfully',
        merchant: { ...addMerchant },
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to create merchant');
    }
  }

  async updateQrCode(id: number, qrCode: string) {
    try {
      const updatedUser = await this.prisma.merchant.update({
        where: {
          id: id,
        },
        data: {
          qrCode: qrCode,
        },
      });
      return createSuccessResponse({
        message: 'Merchant updated successfully',
        merchant: { ...updatedUser },
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to update merchant');
    }
  }

  async getAllMerchant() {
    try {
      const getAllMerchants = await this.prisma.merchant.findMany();
      return createSuccessResponse({
        merchants: getAllMerchants,
        totalMerchants: getAllMerchants.length,
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to get merchants');
    }
  }

  async getOne(id: number) {
    try {
      const getMerchantById = await this.prisma.merchant.findUnique({
        where: {
          id: id,
        },
      });
      return createSuccessResponse({
        merchant: getMerchantById,
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to get merchants');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.merchant.delete({
        where: {
          id: id,
        },
      });
      return createSuccessResponse({
        message: 'Merchant record deleted successfully.',
      });
    } catch (error: any) {
      console.log('Error : ', error);
      throw new BadRequestException('Failed to delete merchant');
    }
  }
}
