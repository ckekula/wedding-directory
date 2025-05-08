export interface CheckoutSession {
  url: string;
}

export interface StripeSession {
  status: string;
  customer_details: {
    email: string;
  };
}