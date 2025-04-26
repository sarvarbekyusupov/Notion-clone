import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GroupMember } from "./models/group-member.model";
import { CreateGroupMemberDto } from "./dto/create-group-member.dto";
import { UpdateGroupMemberDto } from "./dto/update-group-member.dto";
import { Group } from "../groups/models/group.model";

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectModel(GroupMember)
    private readonly groupMemberModel: typeof GroupMember
  ) {}

  async create(
    createGroupMemberDto: CreateGroupMemberDto
  ): Promise<GroupMember> {
    return this.groupMemberModel.create(createGroupMemberDto);
  }

  async findAll(): Promise<GroupMember[]> {
    return this.groupMemberModel.findAll({
      include: [Group],
    });
  }

  async findOne(id: number): Promise<GroupMember> {
    const groupMember = await this.groupMemberModel.findByPk(id, {
      include: [Group],
    });
    if (!groupMember) {
      throw new NotFoundException(`Group member with ID ${id} not found`);
    }
    return groupMember;
  }

  async update(
    id: number,
    updateGroupMemberDto: UpdateGroupMemberDto
  ): Promise<GroupMember> {
    const groupMember = await this.findOne(id);
    await groupMember.update(updateGroupMemberDto);
    return groupMember;
  }

  async remove(id: number): Promise<void> {
    const groupMember = await this.findOne(id);
    await groupMember.destroy();
  }

  async findByGroupId(groupId: number): Promise<GroupMember[]> {
    return this.groupMemberModel.findAll({
      where: { group_id: groupId },
      include: [Group],
    });
  }

  async findByUserId(userId: number): Promise<GroupMember[]> {
    return this.groupMemberModel.findAll({
      where: { user_id: userId },
      include: [Group],
    });
  }
}
