import { Request } from 'express';
import { VisitorEntity } from 'src/database/entities/visitor.entity';

export interface RequestWithVisitor extends Request {
    visitor: VisitorEntity;
}
