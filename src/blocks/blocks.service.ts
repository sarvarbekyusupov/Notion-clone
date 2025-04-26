import { Body, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Block } from './models/block.model';
import { AddPropertyDto } from './dto/add-property.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { privateDecrypt } from 'crypto';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block) private readonly blockModel: typeof Block,
    private readonly propertyService: PropertiesService
  ) {}
  create(createBlockDto: CreateBlockDto) {
    return this.blockModel.create(createBlockDto);
  }

  // @Roles("ADMIN")
  // @UseGuards(RoleGuard)
  // @UseGuards(AuthGuard)
  findAll() {
    return this.blockModel.findAll();
  }

  findOne(id: number) {
    return this.blockModel.findByPk(id);
  }

  async update(id: number, updateBlockDto: UpdateBlockDto) {
    const updated = await this.blockModel.update(updateBlockDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.blockModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "block has been deleted";
    }
    return "There is no block";
  }

  async addProperty(addPropertyDto: AddPropertyDto) {
    const block = await this.findOne(addPropertyDto.blockId);
    const property = await this.propertyService.findOne(
      addPropertyDto.propertyId
    );

    if (!block) {
      throw new NotFoundException("bunday block mavjud emas");
    }

    if (!property) {
      throw new NotFoundException("bunday property mavjud emas");
    }

    await block.$add("properties", property.id);
    return "property qoshildi";
  }

  async removeRole(addPropertyDto: AddPropertyDto) {
    const block = await this.findOne(addPropertyDto.blockId);
    const property = await this.propertyService.findOne(
      addPropertyDto.propertyId
    );

    if (!block) {
      throw new NotFoundException("bunday block mavjud emas");
    }

    if (!property) {
      throw new NotFoundException("bunday property mavjud emas");
    }

    await block.$remove("properties", property.id);
    return "Role olib tawlandi";
  }
}
