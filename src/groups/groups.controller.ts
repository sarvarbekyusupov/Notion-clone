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
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { Group } from "./models/group.model";

@ApiTags("groups")
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new group" })
  @ApiResponse({
    status: 201,
    description: "Group has been successfully created.",
    type: Group,
  })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all groups" })
  @ApiResponse({
    status: 200,
    description: "List of all groups.",
    type: [Group],
  })
  @ApiQuery({
    name: "createdBy",
    required: false,
    description: "Filter groups by creator ID",
  })
  findAll(@Query("createdBy") createdBy?: number) {
    if (createdBy) {
      return this.groupsService.findByCreator(createdBy);
    }
    return this.groupsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a group by ID" })
  @ApiParam({
    name: "id",
    description: "Group ID",
  })
  @ApiResponse({
    status: 200,
    description: "The found group.",
    type: Group,
  })
  @ApiResponse({
    status: 404,
    description: "Group not found.",
  })
  findOne(@Param("id") id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a group" })
  @ApiParam({
    name: "id",
    description: "Group ID",
  })
  @ApiResponse({
    status: 200,
    description: "Group has been successfully updated.",
    type: Group,
  })
  @ApiResponse({
    status: 404,
    description: "Group not found.",
  })
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a group" })
  @ApiParam({
    name: "id",
    description: "Group ID",
  })
  @ApiResponse({
    status: 200,
    description: "Group has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Group not found.",
  })
  remove(@Param("id") id: string) {
    return this.groupsService.remove(+id);
  }
}
