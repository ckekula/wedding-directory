import { Repository } from "typeorm";
import { MyVendorsEntity } from "../entities/myVendors.entity";

export type MyVendorsRepositoryType = Repository<MyVendorsEntity> & {
    findAllMyVendorsByCategory(visitorId: string, category: string): Promise<MyVendorsEntity[]>;
    findMyVendorById(visitorId: string, category: string): Promise<MyVendorsEntity>;
    addToMyVendors(visitorId: string, category: string): Promise<MyVendorsEntity>;
    removeFromMyVendors(visitorId: string, category: string): Promise<MyVendorsEntity>;
}
