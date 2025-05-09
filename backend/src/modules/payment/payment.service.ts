import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../../database/entities/payment.entity';
import { VisitorEntity } from '../../database/entities/visitor.entity';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { PackageEntity } from '../../database/entities/package.entity';

const USD_TO_LKR_RATE = 322.58; // 1 USD = 322.58 LKR (inverse of LKR_TO_USD_RATE)

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(VisitorEntity)
    private visitorRepository: Repository<VisitorEntity>,
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(PackageEntity)
    private packageRepository: Repository<PackageEntity>,
  ) {}

  async createPayment(
    visitorId: string,
    vendorId: string,
    packageId: string,
    amount: number, // amount in USD
    stripeSessionId: string,
  ) {
    const visitor = await this.visitorRepository.findOneBy({ id: visitorId });
    const vendor = await this.vendorRepository.findOneBy({ id: vendorId });
    const package_ = await this.packageRepository.findOneBy({ id: packageId });

    // Convert USD to LKR and round to 2 decimal places
    const amountInLKR = Number((amount * USD_TO_LKR_RATE).toFixed(2));

    const payment = this.paymentRepository.create({
      visitor,
      vendor,
      package: package_,
      amount: amountInLKR, // Save the LKR amount
      stripeSessionId,
      status: 'completed',
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
      relations: {
        vendor: true,
        package: {
          offering: true
        }
      
      },
    });
  }

  async findByVendorId(vendorId: string) {
    return this.paymentRepository.find({
      where: { vendor: { id: vendorId } },
      relations: {
        visitor: true,
        package: {
          offering: true
        },
      },
    });
  }

  async findByPackageId(packageId: string) {
    return this.paymentRepository.find({
      where: { package: { id: packageId } },
      relations: {
        visitor: true,
        vendor: true,
      },
    });
  }
}