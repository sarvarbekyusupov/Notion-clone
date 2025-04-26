import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlockDto {
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsNumber()
  @IsNotEmpty()
  parent: number;

  @IsNumber()
  @IsNotEmpty()
  order_index: number;

  @IsNumber()
  @IsNotEmpty()
  device_id: number;
}
