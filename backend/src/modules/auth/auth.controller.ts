import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { RequestWithVisitor } from './request-with-visitor.interface';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";



@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: RequestWithVisitor): {access_token: string} {
    // Check if visitor is populated correctly
    if (!req.visitor) {
        throw new Error('Visitor not found in request');
    }
    return this.authService.login(req.visitor);
    }
    
}