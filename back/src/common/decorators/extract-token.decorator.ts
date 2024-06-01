import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();
        const token: string = request.headers.authorization?.split(' ')[1];
        return token;
    },
);