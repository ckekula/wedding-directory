import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { VisitorEntity } from 'src/database/entities/visitor.entity';

export const getCurrentUserByContext = (context: ExecutionContext): VisitorEntity => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().visitor;
  }
  if ((context.getType() as any) === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.visitor;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);