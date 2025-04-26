import { IsAlpha, isAlpha, IsNotEmpty } from "class-validator";

export class CreateTypeDto {
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @IsAlpha()
  @IsNotEmpty()
  description: string;
}
