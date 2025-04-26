import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    description: "User password",
    example: "password123",
    required: true,
    minLength: 6,
  })
  readonly password: string;

  @ApiProperty({
    description: "Additional value for authentication",
    example: "some-value",
    required: false,
  })
  readonly value: string;
}
