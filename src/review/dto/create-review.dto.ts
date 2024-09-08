import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateReviewDto {
	@IsNumber()
	@IsNotEmpty({ message: "Booking Id should not be empty." })
	bookingId: number;

	@IsNumber()
	@IsNotEmpty({ message: "Merchant Id should not be empty." })
	merchantId: number;

	@IsNumber()
	@IsNotEmpty({ message: "Rating should not be empty." })
	rating: number;

	@IsString()
	@IsNotEmpty({ message: "Rating should not be empty." })
	comment: string;
}
