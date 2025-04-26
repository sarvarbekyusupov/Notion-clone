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
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { Device } from "./models/device.model";

@ApiTags("devices")
@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new device" })
  @ApiResponse({
    status: 201,
    description: "Device has been successfully created.",
    type: Device,
  })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all devices" })
  @ApiResponse({
    status: 200,
    description: "List of all devices.",
    type: [Device],
  })
  @ApiQuery({
    name: "userId",
    required: false,
    description: "Filter devices by user ID",
  })
  findAll(@Query("userId") userId?: number) {
    if (userId) {
      return this.devicesService.findByUserId(userId);
    }
    return this.devicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a device by ID" })
  @ApiParam({
    name: "id",
    description: "Device ID",
  })
  @ApiResponse({
    status: 200,
    description: "The found device.",
    type: Device,
  })
  @ApiResponse({
    status: 404,
    description: "Device not found.",
  })
  findOne(@Param("id") id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a device" })
  @ApiParam({
    name: "id",
    description: "Device ID",
  })
  @ApiResponse({
    status: 200,
    description: "Device has been successfully updated.",
    type: Device,
  })
  @ApiResponse({
    status: 404,
    description: "Device not found.",
  })
  update(@Param("id") id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a device" })
  @ApiParam({
    name: "id",
    description: "Device ID",
  })
  @ApiResponse({
    status: 200,
    description: "Device has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Device not found.",
  })
  remove(@Param("id") id: string) {
    return this.devicesService.remove(+id);
  }
}
