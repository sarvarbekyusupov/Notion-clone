import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { retry } from "rxjs";
import { ActivateUserDto } from "./dto/activate-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: any
  ) {
    console.log(image);
    return this.userService.create(createUserDto, image);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "List of all users",
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User found",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("profilePicture"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User successfully updated",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    return this.userService.update(+id, updateUserDto, file);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post("active-user")
  @ApiOperation({ summary: "Activate user account" })
  @ApiResponse({
    status: 200,
    description: "User successfully activated",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid activation data",
  })
  @ApiBody({ type: ActivateUserDto })
  async activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activateUser(activateUserDto);
  }
}
