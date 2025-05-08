import { Injectable, NotFoundException } from "@nestjs/common";
import { OfferingEntity } from "../../database/entities/offering.entity";
import { CreateOfferingInput } from "../../graphql/inputs/createOffering.input";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { VendorEntity } from "../../database/entities/vendor.entity";
import { OfferingFilterInput } from "../../graphql/inputs/offeringFilter.input";
import { OfferingRepository } from "../../database/repositories/offering.repository";
import { OfferingRepositoryType } from "../../database/types/offeringTypes";
import { UpdateOfferingInput } from "../../graphql/inputs/updateOffering.input";

@Injectable()
export class OfferingService {
  private offeringRepository: OfferingRepositoryType;
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(VendorEntity)
    private readonly vendorRepository: Repository<VendorEntity>
  ) {
    this.offeringRepository = OfferingRepository(this.dataSource);
  }

  async createOffering(
    createOfferingInput: CreateOfferingInput
  ): Promise<OfferingEntity> {
    const vendor = await this.vendorRepository.findOne({
      where: { id: createOfferingInput.vendor_id },
    });

    if (!vendor) {
      throw new Error("Vendor not found");
    }
    return this.offeringRepository.createOffering(createOfferingInput, vendor);
  }

  async updateOffering(
    id: string,
    input: UpdateOfferingInput
  ): Promise<OfferingEntity> {
    return this.offeringRepository.updateOffering(id, input);
  }

  async deleteOffering(id: string): Promise<boolean> {
    return this.offeringRepository.deleteOffering(id);
  }

  async findOfferingById(id: string): Promise<OfferingEntity> {
    return this.offeringRepository.findOfferingById(id);
  }

  async findOfferingsByFilters(
    filterInput: OfferingFilterInput
  ): Promise<OfferingEntity[]> {
    const { category, city } = filterInput;
    return this.offeringRepository.findOfferingsByFilters(category, city);
  }

  async findOfferingsByVendor(vendorId: string): Promise<OfferingEntity[]> {
    return this.offeringRepository.findOfferingsByVendor(vendorId);
  }

  async updateOfferingBanner(
    id: string,
    fileUrl: string
  ): Promise<OfferingEntity> {
    // Find the offering by ID
    const offering = await this.offeringRepository.findOne({ where: { id } });
    if (!offering) {
      throw new Error("Offering not found");
    }

    const newOffering = { ...offering, banner: fileUrl };
    return await this.offeringRepository.save(newOffering);
  }

  async updateOfferingShowcaseImages(
    id: string,
    fileUrls: string[]
  ): Promise<OfferingEntity> {
    const offering = await this.offeringRepository.findOne({ where: { id } });
    if (!offering) {
      throw new Error("Offering not found");
    }
    const existingShowcaseImages = offering.photo_showcase || [];
    const updatedShowcaseImages = [...existingShowcaseImages, ...fileUrls];

    const newOffering = { ...offering, photo_showcase: updatedShowcaseImages };
    return await this.offeringRepository.save(newOffering);
  }

  async updateOfferingVideos(
    id: string,
    fileUrls: string[]
  ): Promise<OfferingEntity> {
    const offering = await this.offeringRepository.findOne({ where: { id } });
    if (!offering) {
      throw new Error("Offering not found");
    }
    const existingVideos = offering.video_showcase || [];
    const updatedVideos = [...existingVideos, ...fileUrls];
    const newOffering = { ...offering, video_showcase: updatedVideos };
    return await this.offeringRepository.save(newOffering);
  }

  async deleteOfferingBanner(id: string): Promise<boolean> {
    const offering = await this.offeringRepository.findOne({ where: { id } });
    if (!offering) {
      throw new NotFoundException(`Offering with ID ${id} not found`);
    }

    try {
      offering.banner = null;
      await this.offeringRepository.save(offering);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete banner: ${error.message}`);
    }
  }

  async deleteOfferingShowcaseImage(
    id: string,
    index: number
  ): Promise<boolean> {
    const offering = await this.offeringRepository.findOne({ where: { id } });
    if (!offering) {
      throw new NotFoundException(`Offering with ID ${id} not found`);
    }

    try {
      if (!offering.photo_showcase || !Array.isArray(offering.photo_showcase)) {
        throw new Error("No showcase images found");
      }

      if (index < 0 || index >= offering.photo_showcase.length) {
        throw new Error("Invalid image index");
      }

      // Remove the image at the specified index
      offering.photo_showcase.splice(index, 1);

      await this.offeringRepository.save(offering);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete showcase image: ${error.message}`);
    }
  }

  async deleteOfferingVideo(id: string): Promise<boolean> {
    const offering = await this.offeringRepository.findOne({ where: { id } });
    if (!offering) {
      throw new NotFoundException(`Offering with ID ${id} not found`);
    }

    try {
      offering.video_showcase = null;
      await this.offeringRepository.save(offering);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete video: ${error.message}`);
    }
  }
}
