import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "User profile picture",
    required: false,
  })
  @IsOptional()
  profilePicture?: any;
}
