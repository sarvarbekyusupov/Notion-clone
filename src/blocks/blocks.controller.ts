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
} from "@nestjs/common";
import { BlocksService } from "./blocks.service";
import { CreateBlockDto } from "./dto/create-block.dto";
import { UpdateBlockDto } from "./dto/update-block.dto";
import { AddPropertyDto } from "./dto/add-property.dto";
import { PropertiesService } from "src/properties/properties.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("blocks")
@Controller("blocks")
export class BlocksController {
  constructor(
    private readonly blocksService: BlocksService,
    private readonly propertyService: PropertiesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new block" })
  @ApiResponse({
    status: 201,
    description: "Block successfully created",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data",
  })
  @ApiBody({ type: CreateBlockDto })
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all blocks" })
  @ApiResponse({
    status: 200,
    description: "List of all blocks",
  })
  findAll() {
    return this.blocksService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get block by ID" })
  @ApiParam({ name: "id", description: "Block ID" })
  @ApiResponse({
    status: 200,
    description: "Block found",
  })
  @ApiResponse({
    status: 404,
    description: "Block not found",
  })
  findOne(@Param("id") id: string) {
    return this.blocksService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update block by ID" })
  @ApiParam({ name: "id", description: "Block ID" })
  @ApiResponse({
    status: 200,
    description: "Block successfully updated",
  })
  @ApiResponse({
    status: 404,
    description: "Block not found",
  })
  @ApiBody({ type: UpdateBlockDto })
  update(@Param("id") id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.update(+id, updateBlockDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete block by ID" })
  @ApiParam({ name: "id", description: "Block ID" })
  @ApiResponse({
    status: 200,
    description: "Block successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Block not found",
  })
  remove(@Param("id") id: string) {
    return this.blocksService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post("add-property")
  @ApiOperation({ summary: "Add property to block" })
  @ApiResponse({
    status: 200,
    description: "Property successfully added to block",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid property or block data",
  })
  @ApiBody({ type: AddPropertyDto })
  async addProperty(@Body() addPropertyDto: AddPropertyDto) {
    return this.blocksService.addProperty(addPropertyDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("remove-property")
  @ApiOperation({ summary: "Remove property from block" })
  @ApiResponse({
    status: 200,
    description: "Property successfully removed from block",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid property or block data",
  })
  @ApiBody({ type: AddPropertyDto })
  async removeProperty(@Body() addPropertyDto: AddPropertyDto) {
    return this.blocksService.removeRole(addPropertyDto);
  }
}
