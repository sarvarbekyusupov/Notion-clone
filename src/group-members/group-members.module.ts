import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { GroupMembersController } from "./group-members.controller";
import { GroupMembersService } from "./group-members.service";
import { GroupMember } from "./models/group-member.model";
import { Group } from "../groups/models/group.model";

@Module({
  imports: [SequelizeModule.forFeature([GroupMember, Group])],
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  exports: [GroupMembersService],
})
export class GroupMembersModule {}
