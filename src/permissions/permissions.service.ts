import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './models/permission.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly permissionModel: typeof Permission
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionModel.create(createPermissionDto)
  }

  findAll() {
    return this.permissionModel.findAll();
  }

  findOne(id: number) {
    return this.permissionModel.findOne({where:{id}});
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updated = await this.permissionModel.update(updatePermissionDto, {
      where:{id}
    });

    return updated
  }

  async remove(id: number) {
    const deleted = await this.permissionModel.destroy({
      where:{id}
    });

    return deleted
  }
}
