import { Injectable } from "@nestjs/common";
import { VisitorService } from "../visitor/visitor.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

import { VisitorEntity } from "src/database/entities/visitor.entity";
import { jwtSecret } from "./constants";

@Injectable()
export class AuthService {
    constructor(
        private readonly visitorService: VisitorService,
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

    login (visitor: VisitorEntity): {access_token: string } {
        const payload= {
            email: visitor.email,
            sub: visitor.id,
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async verify(token: string): Promise<VisitorEntity>{
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        })

        const visitor = this.visitorService.getVisitorByEmail(decoded.email);

        if(!visitor){
            throw new Error('Unable to get the visitor from decoded token');
        }
        return visitor;
    }
}