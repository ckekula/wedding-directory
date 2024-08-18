import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { VisitorService } from "src/modules/visitor/visitor.service";
import { jwtSecret } from "../constants";
import { VisitorEntity } from "src/database/entities/visitor.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly visitorService: VisitorService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    async validate(validationPayload: { email: string, sub: string} ): Promise<VisitorEntity | null > {
        return await this.visitorService.getVisitorByEmail(validationPayload.email);
    }
}