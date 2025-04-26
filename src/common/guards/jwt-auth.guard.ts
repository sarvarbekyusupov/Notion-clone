import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp();
    console.log(req.getRequest().headers);

    const token = req.getRequest().headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token not provided');

    let user: any;

    try {
      user = this.jwtService.verify(token, {
        secret: `${process.env.SECRET}`,
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Invalid token',
        error,
      });
    }

    req.getRequest().user = user;
    return true;
  }
}
