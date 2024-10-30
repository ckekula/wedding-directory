import { Controller, Post, Req, UseGuards, Res, HttpStatus,UnauthorizedException  } from "@nestjs/common";
import { RequestWithVisitor } from './request-with-visitor.interface';
import { RequestWithVendor } from './request-with-vendor.interface';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('loginVisitor')
    loginVisitor(@Req() req: RequestWithVisitor, @Res() res: Response): void {
        const visitor = req.visitor;
        if (!visitor) {
            throw new UnauthorizedException('Invalid credentials for visitor');
        }

        const { access_token } = this.authService.loginVisitor(visitor);

        // Set access_token as a regular cookie (not HttpOnly, so it is accessible from frontend)
        res.cookie('access_token', access_token, {
            domain: process.env.COOKIE_DOMAIN === 'localhost' ? 'localhost' : '.sayido.lk',
            httpOnly: false,
            secure: process.env.COOKIE_SECURE === 'true',
            sameSite: process.env.COOKIE_SAMESITE === 'lax' ? 'lax' : 'none',
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });

        // Return the access_token in the response as well
        res.status(HttpStatus.OK).json({ message: 'Login successful' });
    }

    @UseGuards(LocalAuthGuard)
    @Post('loginVendor')
    loginVendor(@Req() req: RequestWithVendor, @Res() res: Response): void {
        const vendor = req.vendor;
        if (!vendor) {
            throw new UnauthorizedException('Invalid credentials for vendor');
        }
        const { access_token } = this.authService.loginVendor(vendor);
        res.cookie('access_tokenVendor', access_token, {
            domain: process.env.COOKIE_DOMAIN === 'localhost' ? 'localhost' : '.sayido.lk',
            httpOnly: false,
            secure: process.env.COOKIE_SECURE === 'true',
            sameSite: process.env.COOKIE_SAMESITE === 'lax' ? 'lax' : 'none',
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });
        
        res.status(HttpStatus.OK).json({ message: 'Login successful' });
    }
}
