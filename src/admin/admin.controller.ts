import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({
    status: 201,
    description: "Admin successfully created",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
  })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({
    status: 200,
    description: "List of all admins",
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({
    status: 200,
    description: "Admin found",
  })
  @ApiResponse({
    status: 404,
    description: "Admin not found",
  })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({
    status: 200,
    description: "Admin successfully updated",
  })
  @ApiResponse({
    status: 404,
    description: "Admin not found",
  })
  @ApiBody({ type: UpdateAdminDto })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({
    status: 200,
    description: "Admin successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Admin not found",
  })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
