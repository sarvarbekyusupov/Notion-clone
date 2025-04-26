import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Type } from "./models/type.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type) private readonly typeModel: typeof Type) {}
  create(createTypeDto: CreateTypeDto) {
    return this.typeModel.create(createTypeDto);
  }

  findAll() {
    return this.typeModel.findAll();
  }

  findOne(id: number) {
    return this.typeModel.findOne({ where: { id } });
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const updated = await this.typeModel.update(updateTypeDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.typeModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "block has been deleted";
    }
    return "There is no block";
  }
}
