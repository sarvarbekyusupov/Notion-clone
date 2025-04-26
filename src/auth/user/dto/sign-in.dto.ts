import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    example: "user@mail.com",
    description: "User email",
  })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
  })
  @IsString()
  readonly password!: string;

  @ApiProperty({
    example: "device_token",
    description: "Device token for notifications",
  })
  @IsString()
  readonly value!: string;
}
