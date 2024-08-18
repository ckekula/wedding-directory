import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithVisitor } from '../request-with-visitor.interface';
import { VisitorEntity } from 'src/database/entities/visitor.entity';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest<RequestWithVisitor>();
        const visitor = request.user as VisitorEntity; // Cast user to VisitorEntity

        if (visitor) {
            request.visitor = visitor; // Attach the visitor to the request
        }

        return result;
    }
}
