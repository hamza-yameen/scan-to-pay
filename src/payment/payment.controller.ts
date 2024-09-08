import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto";
import { Authorized } from "libs/decorators";

@Controller("payment")
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Authorized()
	@Post("/scan")
	create(@Body() createPaymentDto: CreatePaymentDto) {
		return this.paymentService.create(createPaymentDto);
	}

	@Authorized()
	@Get(":bookingId")
	getPaymentDetailByBookingId(@Param("bookingId") bookingId: string) {
		return this.paymentService.getPaymentDetailByBookingId(+bookingId);
	}
}
