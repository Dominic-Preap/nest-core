import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const I18Next = createParamDecorator(
  (args: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().i18n
);
