import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateReviewDto } from "./dto";
import { PrismaService } from "src/prisma.service";
import { createSuccessResponse } from "../../libs/helpers/api-response.helpers";

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async add(createReviewDto: CreateReviewDto, userId: number) {
		const { bookingId, merchantId, rating, comment } = createReviewDto;

		try {
			const addReview = await this.prisma.review.create({
				data: {
					bookingId: bookingId,
					rating: rating,
					merchantId: merchantId,
					comment: comment,
					userId: userId,
				},
			});

			return createSuccessResponse({
				message: "Review added successfully",
				review: { ...addReview },
			});
		} catch (error: any) {
			console.log("Error : ", error);
			throw new BadRequestException("Failed to create review");
		}
	}

	async getAllReviewByUserId(userId: number) {
		try {
			const userReviewsWithBookings = await this.prisma.review.findMany({
				where: {
					userId: userId,
				},
				include: {
					booking: true,
					merchant: true,
				},
			});

			return createSuccessResponse({
				userReviews: userReviewsWithBookings,
			});
		} catch (error: any) {
			console.log("Error : ", error);
			throw new BadRequestException("Failed to get review process");
		}
	}

	async getAllReviewByMerchantId(merchantId: number) {
		try {
			const merchantReviewsWithBookings = await this.prisma.review.findMany({
				where: {
					merchantId: merchantId,
				},
				include: {
					booking: true,
				},
			});

			return createSuccessResponse({
				merchantReviews: merchantReviewsWithBookings,
			});
		} catch (error: any) {
			console.log("Error : ", error);
			throw new BadRequestException("Failed to get review process");
		}
	}
}
