import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Block } from "./block.model";
import { Property } from "src/properties/models/property.model";

interface IBlockPropertyCreationAttr {
  blockId: number;
  propertyId: number;
}

@Table({ tableName: "block-property" })
export class BlockProperty extends Model<
  BlockProperty,
  IBlockPropertyCreationAttr
> {
  @ForeignKey(() => Block)
  @Column({ type: DataType.INTEGER })
  declare blockId: number;

  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER })
  declare propertyId: number;
}
