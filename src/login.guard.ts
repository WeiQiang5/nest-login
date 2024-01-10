import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  private logger = new Logger();

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug('request: ', request);

    // const authorization = request.header('authorization') || '';
    const authorization = request.get('authorization');
    this.logger.debug('authorization: ' + authorization);

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      // 有时候403错误可能是由于HTTP头信息设置不正确引起的。可以尝试修改HTTP头信息
      throw new ForbiddenException('请先登录');
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录token失效,请重新登录');
    }
  }
}
