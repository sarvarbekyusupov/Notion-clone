import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "John Doe",
    description: "User's full name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "User's email address",
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd123",
    description: "User's password (must be strong)",
    required: true,
    minLength: 8,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: "additional-value",
    description: "Additional user value",
    required: false,
  })
  @IsOptional()
  value: string;

  @ApiProperty({
    type: "string",
    format: "binary",
    description: "User profile picture",
    required: false,
  })
  @IsOptional()
  profilePicture?: any;
}
