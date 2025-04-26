import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { SignInDto } from './dto/sign-in.dto';
import { error } from 'console';
import { use } from 'i18next';
import { User } from 'src/user/models/user.model';
import { JwtService } from "@nestjs/jwt";
import { AdminService } from '../../admin/admin.service';
import { Admin } from '../../admin/models/admin.model';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';



@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
    };

    return { token: this.jwtService.sign(payload) };
  }

  async signUp(createAdminDto: CreateAdminDto) {
    const condidate = await this.adminService.findByEmail(createAdminDto.email);

    if (condidate) {

      throw new BadRequestException("Bunday email foydalanuvchisi mavjud");
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

    createAdminDto.password = hashedPassword;

    const newAdmin = await this.adminService.create(createAdminDto);

    return newAdmin;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.adminService.findByEmail(signInDto.email);

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
