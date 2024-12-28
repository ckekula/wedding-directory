import { Repository } from "node_modules/typeorm";
import { MyVendorsEntity } from "../entities/myvendors.entity";

export type MyVendorsRepositoryType = Repository<MyVendorsEntity> & {
    findAllMyVendorsByCategory(visitorId: string, category: string): Promise<MyVendorsEntity[]>;
    findMyVendorById(visitorId: string, category: string): Promise<MyVendorsEntity>;
    addToMyVendors(visitorId: string, category: string): Promise<MyVendorsEntity>;
    removeFromMyVendors(visitorId: string, category: string): Promise<MyVendorsEntity>;
}
