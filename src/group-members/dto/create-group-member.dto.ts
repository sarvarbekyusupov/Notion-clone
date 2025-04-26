import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateGroupMemberDto {
  @ApiProperty({
    example: 1,
    description: "Group ID",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  group_id: number;

  @ApiProperty({
    example: 1,
    description: "User ID",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: false,
    description: "Whether the member is a group admin",
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  is_group_admin?: boolean;
}
