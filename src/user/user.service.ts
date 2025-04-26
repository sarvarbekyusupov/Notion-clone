import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { ActivateUserDto } from "./dto/activate-user.dto";
import * as bcrypt from "bcrypt";
import { FileService } from "../file/file.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly fileService: FileService
  ) {}

  async findAll() {
    return this.userModel.findAll();
  }

  async create(createUserDto: CreateUserDto, file?: any) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    let profilePicture: string ;

    if (!file) {
      throw new NotFoundException("rasm berilmadi")
    }

    profilePicture = await this.fileService.saveFile(file);


    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      profilePicture,
    });

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto & { password?: string },
    file?: any
  ) {
    const user = await this.findOne(id);
    let profilePicture = user.profilePicture;

    if (file) {
      if (profilePicture) {
        await this.fileService.deleteFile(profilePicture);
      }
      profilePicture = await this.fileService.saveFile(file);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update({
      ...updateUserDto,
      profilePicture,
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    // Delete profile picture if exists
    if (user.profilePicture) {
      await this.fileService.deleteFile(user.profilePicture);
    }

    await user.destroy();
    return user;
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.findOne(activateUserDto.userId);
    user.isActive = true;
    await user.save();
    return user;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
