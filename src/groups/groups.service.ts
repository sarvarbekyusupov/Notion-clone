import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupMember } from '../group-members/models/group-member.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private readonly groupModel: typeof Group,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.findAll({
      include: [GroupMember],
    });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupModel.findByPk(id, {
      include: [GroupMember],
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    await group.update(updateGroupDto);
    return group;
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await group.destroy();
  }

  async findByCreator(userId: number): Promise<Group[]> {
    return this.groupModel.findAll({
      where: { created_by: userId },
      include: [GroupMember],
    });
  }
} 