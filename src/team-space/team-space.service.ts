import { Injectable } from '@nestjs/common';
import { CreateTeamSpaceDto } from './dto/create-team-space.dto';
import { UpdateTeamSpaceDto } from './dto/update-team-space.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TeamSpace } from './models/team-space.model';

@Injectable()
export class TeamSpaceService {
  constructor(
    @InjectModel(TeamSpace)
    private readonly teamModel: typeof TeamSpace
  ) {}
  create(createTeamSpaceDto: CreateTeamSpaceDto) {
    return this.teamModel.create(createTeamSpaceDto);
  }

  findAll() {
    return this.teamModel.findAll();
  }

  findOne(id: number) {
    return this.teamModel.findOne({where:{id}});
  }

  async update(id: number, updateTeamSpaceDto: UpdateTeamSpaceDto) {
    const updated = await this.teamModel.update(updateTeamSpaceDto,
       {where:{id}}
      )

    return updated
  }

  async remove(id: number) {
    const deleted = await this.teamModel.destroy({
      where: { id },
    });

    return deleted;
  }
}
