import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({
    description: "Admin full name",
    example: "John Doe",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Admin email address",
    example: "admin@example.com",
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin password (must be strong)",
    example: "StrongP@ssw0rd123",
    required: true,
    minLength: 8,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: "Additional admin value",
    example: "some-value",
    required: false,
  })
  value: string;
}
