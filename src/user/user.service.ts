import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { use } from 'i18next';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this, this.userModel.findByPk(+id);
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      // include: {
      //   model: Rol,
      //   attributes: ["value"],
      //   through: { attributes: [] },
      // },
    });
    return user?.dataValues;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.findOne(activateUserDto.userId);
    if (!user) {
      throw new NotFoundException("Bunday user mavjud emas");
    }

    user.isActive = true;

    await user.save()
    return "Foydalanuvchi faollashitirldi"
  }
}
