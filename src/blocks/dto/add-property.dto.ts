import { IsNotEmpty, IsNumber } from "class-validator";

export class AddPropertyDto {
  @IsNumber()
  @IsNotEmpty()
  blockId: number;

  @IsNumber()
  @IsNotEmpty()
  propertyId: number;
}
