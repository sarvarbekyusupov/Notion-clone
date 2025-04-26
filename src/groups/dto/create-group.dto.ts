import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateGroupDto {
  @ApiProperty({
    example: "Development Team",
    description: "Group name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "👨‍💻",
    description: "Group icon",
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    example: "Team responsible for development tasks",
    description: "Group description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: "User ID who created the group",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}
