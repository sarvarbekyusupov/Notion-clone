import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}
  create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create(createAdminDto);
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findOne({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updated = await this.adminModel.update(updateAdminDto, {
      where: { id },
    });
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.adminModel.destroy({
      where: { id },
    });
    if (deleted > 0) {
      return "admin has been deleted";
    }

    return "admin has not been found";
  }

  async findByEmail(email: string) {
    const user = await this.adminModel.findOne({
      where: { email },
      // include: {
      //   model: Rol,
      //   attributes: ["value"],
      //   through: { attributes: [] },
      // },
    });
    return user?.dataValues;
  }
}
