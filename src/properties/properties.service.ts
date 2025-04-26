import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Property } from './models/property.model';

@Injectable()
export class PropertiesService {
  constructor(
      @InjectModel(Property) private readonly propertyModel: typeof Property
    ) {}
  create(createPropertyDto: CreatePropertyDto) {
    return this.propertyModel.create(createPropertyDto);
  }

  findAll() {
    return this.propertyModel.findAll()
  }

  findOne(id: number) {
    return this.propertyModel.findOne({where:{id}});
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
     const updated = await this.propertyModel.update(updatePropertyDto, {
       where: { id },
       returning: true,
     });
     return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.propertyModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "block has been deleted";
    }
    return "There is no block";
  }
}
