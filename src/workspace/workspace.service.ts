import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Workspace } from './models/workspace.model';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace)
    private readonly workModel: typeof Workspace
  ) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    return this.workModel.create(createWorkspaceDto);
  }

  findAll() {
    return this.workModel.findAll();
  }

  findOne(id: number) {
    return this.workModel.findOne({ where: { id } });
  }


  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const updated = await this.workModel.update(updateWorkspaceDto, {
      where: { id },
    });

    return updated;
  }

  async remove(id: number) {
    const deleted = await this.workModel.destroy({
      where: { id },
    });

    return deleted;
  }
}
