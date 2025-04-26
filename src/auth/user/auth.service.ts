import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { SignInDto } from './dto/sign-in.dto';
import { error } from 'console';
import { use } from 'i18next';
import { User } from 'src/user/models/user.model';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.isActive,
    };

    return { token: this.jwtService.sign(payload) };
  }

  async signUp(createUserDto: CreateUserDto) {
    const condidate = await this.userService.findByEmail(createUserDto.email);

    if (condidate) {
      // throw new HttpException("Bunday email foydalanuvchisi mavjud",HttpStatus.BAD_REQUEST)

      throw new BadRequestException("Bunday email foydalanuvchisi mavjud");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);

    createUserDto.password = hashedPassword;

    const newUser = await this.userService.create(createUserDto);

    return newUser;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("Bunday email bilan user mavjud emas");
    }

    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Notogri password");
    }

  

    throw new ForbiddenException("sizda bunday role yoq")

  }
}
