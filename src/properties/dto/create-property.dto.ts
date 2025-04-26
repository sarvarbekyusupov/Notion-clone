import { IsAlpha, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Property name',
    example: 'Luxury Villa',
    required: true
  })
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Property description',
    example: 'Beautiful villa with ocean view',
    required: true
  })
  @IsAlpha()
  @IsNotEmpty()
  description: string;
}
