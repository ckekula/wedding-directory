import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { VisitorEntity } from "src/database/entities/visitor.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({ usernameField: 'email'})
    }

    async validate(email: string, password: string): Promise<VisitorEntity>{
        const visitor = await this.authService.validateVisitor(email, password);

        if(!visitor){
            throw new UnauthorizedException();
        }
        return visitor;
    }
}