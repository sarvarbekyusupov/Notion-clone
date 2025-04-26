import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PropertiesService } from "./properties.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("properties")
@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new property" })
  @ApiResponse({
    status: 201,
    description: "Property successfully created",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
  })
  @ApiBody({ type: CreatePropertyDto })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all properties" })
  @ApiResponse({
    status: 200,
    description: "List of all properties",
  })
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get property by ID" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({
    status: 200,
    description: "Property found",
  })
  @ApiResponse({
    status: 404,
    description: "Property not found",
  })
  findOne(@Param("id") id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update property by ID" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({
    status: 200,
    description: "Property successfully updated",
  })
  @ApiResponse({
    status: 404,
    description: "Property not found",
  })
  @ApiBody({ type: UpdatePropertyDto })
  update(
    @Param("id") id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete property by ID" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({
    status: 200,
    description: "Property successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Property not found",
  })
  remove(@Param("id") id: string) {
    return this.propertiesService.remove(+id);
  }
}
