import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { OfferingEntity } from '../../database/entities/offering.entity';
import { PackageEntity } from '../../database/entities/package.entity';

@Injectable()
export class EmbeddingsService {
  private openai: OpenAI;
  
  constructor(
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(OfferingEntity)
    private offeringRepository: Repository<OfferingEntity>,
    @InjectRepository(PackageEntity)
    private packageRepository: Repository<PackageEntity>,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    
    return response.data[0].embedding;
  }

  async processVendor(vendorId: string): Promise<void> {
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
      relations: ['offerings', 'offerings.packages'],
    });

    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} not found`);
    }

    const vendorContent = `
      Vendor Name: ${vendor.busname}
      About: ${vendor.about}
      City: ${vendor.city}
      Contact: ${vendor.email}
    `;

    const embedding = await this.generateEmbedding(vendorContent);

    await this.vendorRepository.query(`
      INSERT INTO vendor_embeddings (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO UPDATE
      SET content = $2, embedding = $3::vector
    `, [vendor.id, vendorContent, embedding]);

    for (const offering of vendor.offering) {
      await this.processOffering(offering, vendor);
    }
  }

  async processOffering(offering: OfferingEntity, vendor: VendorEntity): Promise<void> {
    const offeringContent = `
      Vendor: ${vendor.busname}
      Offering: ${offering.name}
      Description: ${offering.description}
      Category: ${offering.category}
      Website: ${offering.website}
      Instagram: ${offering.instagram}
      Facebook: ${offering.facebook}
      X: ${offering.x}
    `;

    const embedding = await this.generateEmbedding(offeringContent);

    await this.offeringRepository.query(`
      INSERT INTO offering_embeddings (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO UPDATE
      SET content = $2, embedding = $3::vector
    `, [offering.id, offeringContent, embedding]);

    for (const pkg of offering.packages) {
      await this.processPackage(pkg, offering, vendor);
    }
  }

  async processPackage(pkg: PackageEntity, offering: OfferingEntity, vendor: VendorEntity): Promise<void> {
    const packageContent = `
      Vendor: ${vendor.busname}
      Offering: ${offering.name}
      Package: ${pkg.name}
      Description: ${pkg.description}
      Features: ${pkg.features.join(', ')}
      Pricing: ${pkg.pricing}
    `;

    const embedding = await this.generateEmbedding(packageContent);

    await this.packageRepository.query(`
      INSERT INTO package_embeddings (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO UPDATE
      SET content = $2, embedding = $3::vector
    `, [pkg.id, packageContent, embedding]);
  }

  async indexAllVendors(): Promise<void> {
    const vendors = await this.vendorRepository.find();
    
    for (const vendor of vendors) {
      await this.processVendor(vendor.id);
    }
  }
}