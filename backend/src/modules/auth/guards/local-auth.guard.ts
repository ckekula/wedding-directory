import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithVisitor } from '../request-with-visitor.interface';
import { VisitorEntity } from '../../../database/entities/visitor.entity';
import { RequestWithVendor } from '../request-with-vendor.interface';
import { VendorEntity } from '../../../database/entities/vendor.entity';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest<RequestWithVisitor & RequestWithVendor>();

        const user = request.user;

        // Check if the user is a visitor
        if (user instanceof VisitorEntity) {
            request.visitor = user as VisitorEntity;  // Attach the visitor to the request
        }

        // Check if the user is a vendor
        if (user instanceof VendorEntity) {
            request.vendor = user as VendorEntity;  // Attach the vendor to the request
        }


        return result;
    }


}
