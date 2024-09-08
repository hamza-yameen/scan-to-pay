import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "libs/modules/auth.module";
import { TokenService } from "libs/modules/auth.module";

@Module({
	imports: [AuthModule],
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService, TokenService],
})
export class ReviewModule {}
