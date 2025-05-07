import { Controller, Post, Get, Headers, Query, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

interface CreateCheckoutSessionDto {
  amount: number;
  packageId: string;
  visitorId: string;
  vendorId: string;
}

@Controller('api/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Headers('origin') origin: string,
    @Body() body: CreateCheckoutSessionDto
  ) {
    const session = await this.stripeService.createCheckoutSession(
      origin,
      body.amount,
      body.packageId,
      body.visitorId,
      body.vendorId
    );
    return { url: session.url };
  }

  @Get('session')
  async getSession(@Query('session_id') sessionId: string) {
    return this.stripeService.retrieveCheckoutSession(sessionId);
  }
}