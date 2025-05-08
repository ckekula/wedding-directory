import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private paymentService: PaymentService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-04-30.basil',
    });
  }

  async createCheckoutSession(origin: string, amount: number, packageId: string, visitorId: string, vendorId: string) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Advance Payment',
              description: `20% advance payment for package ${packageId}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        packageId,
        visitorId,
        vendorId,
      },
    });

    // Create payment record
    await this.paymentService.createPayment(
      visitorId,
      vendorId,
      packageId,
      amount,
      session.id
    );

    return session;
  }

  async retrieveCheckoutSession(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    });
  }

  async handleWebhook(event: any) {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await this.paymentService.updatePaymentStatus(session.id, 'completed');
        break;
      case 'checkout.session.expired':
        await this.paymentService.updatePaymentStatus(event.data.object.id, 'failed');
        break;
    }
  }
}