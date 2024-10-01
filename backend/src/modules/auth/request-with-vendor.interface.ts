import { Request } from 'express';
import { VendorEntity } from 'src/database/entities/vendor.entity';

export interface RequestWithVendor extends Request {
  vendor: VendorEntity;
}
