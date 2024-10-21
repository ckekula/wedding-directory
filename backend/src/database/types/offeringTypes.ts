import { OfferingEntity } from "src/database/entities/offering.entity";
import { VendorEntity } from "src/database/entities/vendor.entity";
import { Repository } from "typeorm";

export type OfferingRepositoryType = Repository<OfferingEntity> & {
    createOffering(
      createOfferingInput: Partial<OfferingEntity>,
      vendor: VendorEntity,
    ): Promise<OfferingEntity>;

    updateOffering(
      id: string,
      updateOfferingInput: Partial<OfferingEntity>
    ): Promise<OfferingEntity>;

    deleteOffering(id: string): Promise<boolean>;

    findOfferingById(id: string): Promise<OfferingEntity>;
  
    findOfferingsByFilters(category?: string, city?: string): Promise<OfferingEntity[]>;

    findOfferingsByVendor(id: string): Promise<OfferingEntity[]>;
};