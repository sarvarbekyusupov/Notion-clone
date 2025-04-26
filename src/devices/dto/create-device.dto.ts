import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsJSON,
  IsDate,
} from "class-validator";

export class CreateDeviceDto {
  @ApiProperty({
    example: "Device 1",
    description: "Device name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "device-123",
    description: "Unique device identifier",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  device_unique_id: string;

  @ApiProperty({
    example: "2024-01-01T00:00:00.000Z",
    description: "Last active timestamp",
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  last_active: Date;

  @ApiProperty({
    example: "New York, USA",
    description: "Device location",
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    example: { os: "iOS", version: "14.5" },
    description: "Device information",
    required: false,
  })
  @IsOptional()
  @IsJSON()
  information?: string;

  @ApiProperty({
    example: 1,
    description: "User ID",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
