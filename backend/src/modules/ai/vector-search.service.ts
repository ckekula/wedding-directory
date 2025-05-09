import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { OfferingEntity } from '../../database/entities/offering.entity';
import { PackageEntity } from '../../database/entities/package.entity';
import { EmbeddingsService } from './embeddings.service';

interface SearchResult {
    id: number;
    name: string;
    similarity: number;
    content: string;
}

@Injectable()
export class VectorSearchService {
  constructor(
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(OfferingEntity)
    private offeringRepository: Repository<OfferingEntity>,
    @InjectRepository(PackageEntity)
    private packageRepository: Repository<PackageEntity>,
    private embeddingsService: EmbeddingsService,
  ) {}

  async search(query: string, limit = 5): Promise<SearchResult[]> {
    const queryEmbedding = await this.embeddingsService.generateEmbedding(query);
    
    // Format the embedding array as a PostgreSQL vector string
    const formattedEmbedding = `[${queryEmbedding.join(',')}]`;

    // Search for relevant vendor data
    const vendorResults = await this.vendorRepository.query(`
      SELECT v.*, e.content, 
        1 - (e.embedding <=> $1::vector) as similarity
      FROM vendor v
      JOIN vendor_embeddings e ON v.id = e.id
      ORDER BY similarity DESC
      LIMIT $2
    `, [formattedEmbedding, limit]);

    // Search for relevant offering data
    const offeringResults = await this.offeringRepository.query(`
      SELECT o.*, v.busname as vendor_name, e.content,
        1 - (e.embedding <=> $1::vector) as similarity
      FROM offering o
      JOIN offering_embeddings e ON o.id = e.id
      JOIN vendor v ON o.vendor_id = v.id
      ORDER BY similarity DESC
      LIMIT $2
    `, [formattedEmbedding, limit]);

    // Search for relevant package data
    const packageResults = await this.packageRepository.query(`
      SELECT p.*, o.name as offering_name, v.busname as vendor_name, e.content,
        1 - (e.embedding <=> $1::vector) as similarity
      FROM package p
      JOIN package_embeddings e ON p.id = e.id
      JOIN offering o ON p.offering_id = o.id
      JOIN vendor v ON o.vendor_id = v.id
      ORDER BY similarity DESC
      LIMIT $2
    `, [formattedEmbedding, limit]);

    // Combine and sort results
    const allResults = [
      ...vendorResults,
      ...offeringResults,
      ...packageResults,
    ].sort((a, b) => b.similarity - a.similarity);

    // Take the top results
    return allResults.slice(0, limit);
  }
}