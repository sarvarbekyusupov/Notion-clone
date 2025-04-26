import { ApiProperty } from "@nestjs/swagger";

export class ActivateUserDto {
  @ApiProperty({
    description: "User ID to activate",
    example: 1,
    required: true,
  })
  userId: number;
}
