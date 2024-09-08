import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto";
import { Authorized, CurrentUser } from "libs/decorators";

@Controller("review")
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Authorized()
	@Post("/add")
	add(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: any) {
		return this.reviewService.add(createReviewDto, user.id);
	}

	@Authorized()
	@Get("/user")
	getAllReviewByUserId(@CurrentUser() user: any) {
		return this.reviewService.getAllReviewByUserId(user.id);
	}

	@Authorized()
	@Get("/merchant/:merchantId")
	getAllReviewByMerchant(@Param("merchantId") merchantId: string) {
		return this.reviewService.getAllReviewByMerchantId(+merchantId);
	}
}
