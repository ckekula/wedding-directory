import { Module} from '@nestjs/common';
import { AuthService} from './auth.service'
import { VisitorModule } from '../visitor/visitor.module';
import { PassportModule } from '@nestjs/passport';
import { jwtSecret } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { VendorModule } from '../vendor/vendor.module';

@Module({
    imports: [
       
        VisitorModule,
        VendorModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtSecret,
            signOptions: { expiresIn: '3600s'}
        })
    ],
    controllers:[AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy]
})

export class AuthModule {}