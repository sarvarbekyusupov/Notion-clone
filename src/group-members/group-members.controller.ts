import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { GroupMembersService } from "./group-members.service";
import { CreateGroupMemberDto } from "./dto/create-group-member.dto";
import { UpdateGroupMemberDto } from "./dto/update-group-member.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { GroupMember } from "./models/group-member.model";

@ApiTags("group-members")
@Controller("group-members")
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new group member" })
  @ApiResponse({
    status: 201,
    description: "Group member has been successfully created.",
    type: GroupMember,
  })
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all group members" })
  @ApiResponse({
    status: 200,
    description: "List of all group members.",
    type: [GroupMember],
  })
  @ApiQuery({
    name: "groupId",
    required: false,
    description: "Filter members by group ID",
  })
  @ApiQuery({
    name: "userId",
    required: false,
    description: "Filter members by user ID",
  })
  findAll(
    @Query("groupId") groupId?: number,
    @Query("userId") userId?: number
  ) {
    if (groupId) {
      return this.groupMembersService.findByGroupId(groupId);
    }
    if (userId) {
      return this.groupMembersService.findByUserId(userId);
    }
    return this.groupMembersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a group member by ID" })
  @ApiParam({
    name: "id",
    description: "Group member ID",
  })
  @ApiResponse({
    status: 200,
    description: "The found group member.",
    type: GroupMember,
  })
  @ApiResponse({
    status: 404,
    description: "Group member not found.",
  })
  findOne(@Param("id") id: string) {
    return this.groupMembersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a group member" })
  @ApiParam({
    name: "id",
    description: "Group member ID",
  })
  @ApiResponse({
    status: 200,
    description: "Group member has been successfully updated.",
    type: GroupMember,
  })
  @ApiResponse({
    status: 404,
    description: "Group member not found.",
  })
  update(
    @Param("id") id: string,
    @Body() updateGroupMemberDto: UpdateGroupMemberDto
  ) {
    return this.groupMembersService.update(+id, updateGroupMemberDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a group member" })
  @ApiParam({
    name: "id",
    description: "Group member ID",
  })
  @ApiResponse({
    status: 200,
    description: "Group member has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Group member not found.",
  })
  remove(@Param("id") id: string) {
    return this.groupMembersService.remove(+id);
  }
}
