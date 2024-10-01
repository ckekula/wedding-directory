import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { VisitorService } from "src/modules/visitor/visitor.service";
import { jwtSecret } from "../constants";
import { VisitorEntity } from "src/database/entities/visitor.entity";
import { VendorService } from '../../vendor/vendor.service';
import { VendorEntity } from '../../../database/entities/vendor.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly visitorService: VisitorService, private readonly vendorService: VendorService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    async validateVisitor(validationPayload: { email: string, sub: string} ): Promise<VisitorEntity | null > {
        return await this.visitorService.getVisitorByEmail(validationPayload.email);
    }

    async validateVendor(validationPayload: { email: string, sub: string} ): Promise<VendorEntity | null > {
        return await this.vendorService.getVendorByEmail(validationPayload.email);
    }
}