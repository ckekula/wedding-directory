import { BudgetItemEntity } from './budget_item.entity';
import { BudgetToolEntity } from './budget_tool.entity';
import { ChecklistEntity } from './checklist.entity';
import { GuestListEntity } from './guestlist.entity';
import { MyVendorsEntity } from './myVendors.entity';
import { OfferingEntity } from './offering.entity';
import { PackageEntity } from './package.entity';
import { PaymentEntity } from './payment.entity';
import { ReviewEntity } from './review.entity';
import { VendorEntity } from './vendor.entity';
import { VisitorEntity } from './visitor.entity';

export function getEntities() {
  return [
    VisitorEntity,
    ReviewEntity,
    BudgetItemEntity,
    BudgetToolEntity,
    ChecklistEntity,
    GuestListEntity,
    MyVendorsEntity,
    OfferingEntity,
    PackageEntity,
    PaymentEntity,
    VendorEntity,
    
  ];
}