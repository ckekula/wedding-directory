import { Injectable } from "@nestjs/common";
import { VisitorService } from "../visitor/visitor.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

import { VisitorEntity } from "../../database/entities/visitor.entity";
import { jwtSecret } from "./constants";
import { VendorService } from '../vendor/vendor.service';
import { VendorEntity } from '../../database/entities/vendor.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly visitorService: VisitorService,
        private readonly vendorService: VendorService,
        private readonly jwtService: JwtService
        
    ){}

    async validateVisitor(email: string, password: string): Promise<VisitorEntity | null>{
        const visitor = await this.visitorService.getVisitorByEmail(email);

        if(!visitor){
            return null;
        }

        const passwordIsValid = await bcrypt.compare(password, visitor.password)
        return passwordIsValid ? visitor : null;
    }

    async validateVendor(email: string, password: string): Promise<VendorEntity | null> {
        const vendor = await this.vendorService.getVendorByEmail(email);

        if(!vendor){
            return null;
        }
        const passwordIsValid = await bcrypt.compare(password, vendor.password);
        return passwordIsValid ? vendor : null;
    }

    loginVisitor (visitor: VisitorEntity): {access_token: string } {
        const payload= {
            email: visitor.email,
            sub: visitor.id,
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    loginVendor (vendor: VendorEntity): {access_token: string } {
        const payload = {
            email: vendor.email,
            sub: vendor.id
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async verifyVisitor(token: string): Promise<VisitorEntity>{
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        })

        const visitor = this.visitorService.getVisitorByEmail(decoded.email);

        if(!visitor){
            throw new Error('Unable to get the visitor from decoded token');
        }
        return visitor;
    }

    async verifyVendor(token: string): Promise<VendorEntity>{
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        })

        const vendor = this.vendorService.getVendorByEmail(decoded.email);

        if(!vendor){
            throw new Error('Unable to get the vendor from decoded token');
        }
        return vendor;
    }
}