import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const { userData } = ctx.getArgs()[2];
    if (!!userData) {
      return !!userData;
    } else {
      throw new UnauthorizedException('未登录');
    }
  }
}
