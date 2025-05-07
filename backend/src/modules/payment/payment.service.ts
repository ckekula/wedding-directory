import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from 'src/database/entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(
    visitorId: string,
    vendorId: string,
    packageId: string,
    amount: number,
    stripeSessionId: string,
  ) {
    const payment = this.paymentRepository.create({
      visitor: { id: visitorId },
      vendor: { id: vendorId },
      package: { id: packageId },
      amount,
      stripeSessionId,
      status: 'pending',
    });

    return this.paymentRepository.save(payment);
  }

  async updatePaymentStatus(stripeSessionId: string, status: 'completed' | 'failed') {
    return this.paymentRepository.update(
      { stripeSessionId },
      { status }
    );
  }

  async findByVisitorId(visitorId: string) {
    return this.paymentRepository.find({
      where: { visitor: { id: visitorId } },
      relations: ['visitor', 'vendor', 'package'],
    });
  }

  async findByVendorId(vendorId: string) {
    return this.paymentRepository.find({
      where: { vendor: { id: vendorId } },
      relations: ['visitor', 'vendor', 'package'],
    });
  }

  async findByPackageId(packageId: string) {
    return this.paymentRepository.find({
      where: { package: { id: packageId } },
      relations: ['visitor', 'vendor', 'package'],
    });
  }
}