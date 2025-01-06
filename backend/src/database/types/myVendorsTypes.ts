import { Repository } from "typeorm";
import { MyVendorsEntity } from "../entities/myVendors.entity";

export type MyVendorsRepositoryType = Repository<MyVendorsEntity> & {
    findAllMyVendorsByCategory(visitorId: string, category: string): Promise<MyVendorsEntity[]>;
    findAllMyVendors(visitorId: string): Promise<MyVendorsEntity[]>;
    findMyVendorById(visitorId: string, offeringId: string): Promise<MyVendorsEntity>;
    addToMyVendors(visitorId: string, offeringId: string): Promise<MyVendorsEntity>;
    removeFromMyVendors(visitorId: string, offeringId: string): Promise<MyVendorsEntity>;
}
