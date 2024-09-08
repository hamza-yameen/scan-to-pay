import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "libs/modules/auth.module";
import { TokenService } from "libs/modules/auth.module";

@Module({
	imports: [AuthModule],
	controllers: [PaymentController],
	providers: [PaymentService, PrismaService, TokenService],
})
export class PaymentModule {}
