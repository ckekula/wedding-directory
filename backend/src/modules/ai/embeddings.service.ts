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

  // Helper method to format array for pgvector
  private formatEmbeddingForPgVector(embedding: number[]): string {
    return `[${embedding.join(',')}]`;
  }

  async processVendor(vendorId: string): Promise<void> {
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
      relations: ['offering', 'offering.packages'],
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
    // Format the embedding array for pgvector
    const pgVectorEmbedding = this.formatEmbeddingForPgVector(embedding);

    await this.vendorRepository.query(`
      INSERT INTO vendor_embeddings (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO UPDATE
      SET content = $2, embedding = $3::vector
    `, [vendor.id, vendorContent, pgVectorEmbedding]);

    if (vendor.offering && vendor.offering.length > 0) {
      for (const offering of vendor.offering) {
        await this.processOffering(offering, vendor);
      }
    }
  }

  async processOffering(offering: OfferingEntity, vendor: VendorEntity): Promise<void> {
    const offeringContent = `
      Vendor: ${vendor.busname}
      Offering: ${offering.name}
      Description: ${offering.description}
      Category: ${offering.category}
      Website: ${offering.website || ''}
      Instagram: ${offering.instagram || ''}
      Facebook: ${offering.facebook || ''}
      X: ${offering.x || ''}
    `;

    const embedding = await this.generateEmbedding(offeringContent);
    // Format the embedding array for pgvector
    const pgVectorEmbedding = this.formatEmbeddingForPgVector(embedding);

    await this.offeringRepository.query(`
      INSERT INTO offering_embeddings (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO UPDATE
      SET content = $2, embedding = $3::vector
    `, [offering.id, offeringContent, pgVectorEmbedding]);

    if (offering.packages && offering.packages.length > 0) {
      for (const pkg of offering.packages) {
        await this.processPackage(pkg, offering, vendor);
      }
    }
  }

  async processPackage(pkg: PackageEntity, offering: OfferingEntity, vendor: VendorEntity): Promise<void> {
    // Add null checks for features
    const features = pkg.features && Array.isArray(pkg.features) ? pkg.features.join(', ') : '';
    
    const packageContent = `
      Vendor: ${vendor.busname}
      Offering: ${offering.name}
      Package: ${pkg.name}
      Description: ${pkg.description || ''}
      Features: ${features}
      Pricing: ${pkg.pricing || ''}
    `;

    const embedding = await this.generateEmbedding(packageContent);
    // Format the embedding array for pgvector
    const pgVectorEmbedding = this.formatEmbeddingForPgVector(embedding);

    await this.packageRepository.query(`
      INSERT INTO package_embeddings (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO UPDATE
      SET content = $2, embedding = $3::vector
    `, [pkg.id, packageContent, pgVectorEmbedding]);
  }

  async indexAllVendors(): Promise<void> {
    const vendors = await this.vendorRepository.find();
    
    let count = 0;
    for (const vendor of vendors) {
      try {
        await this.processVendor(vendor.id);
        count++;
      } catch (error) {
        console.error(`Error processing vendor ${vendor.id} (${vendor.busname}):`, error.message);
      }
    }
    
    console.log(`Successfully processed ${count} vendors`);
  }
}