import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from 'src/database/entities/payment.entity';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { PackageEntity } from 'src/database/entities/package.entity';

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
    amount: number,
    stripeSessionId: string,
  ) {
    const visitor = await this.visitorRepository.findOneBy({ id: visitorId });
    const vendor = await this.vendorRepository.findOneBy({ id: vendorId });
    const package_ = await this.packageRepository.findOneBy({ id: packageId });

    const payment = this.paymentRepository.create({
      visitor,
      vendor,
      package: package_,
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
      relations: {
        vendor: true,
        package: true,
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