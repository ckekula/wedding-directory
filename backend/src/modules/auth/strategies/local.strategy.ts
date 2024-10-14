import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { VisitorEntity } from "src/database/entities/visitor.entity";
import { VendorEntity } from '../../../database/entities/vendor.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });  // Using 'email' as the username field
    }

    // This is the method Passport will call to validate the user
    async validate(email: string, password: string): Promise<VisitorEntity | VendorEntity> {
        // First, try to validate as a visitor
        const visitor = await this.authService.validateVisitor(email, password);
        if (visitor) {
            return visitor;  // Return the visitor if found
        }

        // If not a visitor, try to validate as a vendor
        const vendor = await this.authService.validateVendor(email, password);
        if (vendor) {
            return vendor;  // Return the vendor if found
        }

        // If neither visitor nor vendor, throw UnauthorizedException
        throw new UnauthorizedException('Invalid credentials');
    }
}
