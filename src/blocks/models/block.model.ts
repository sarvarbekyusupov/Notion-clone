import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Property } from "src/properties/models/property.model";
import { BlockProperty } from "./block-properties.model";

interface IBlocksCreationAttr {
  typeId: number;
  created_by: string;
  parent: number;
  order_index: number;
}

@Table({ tableName: "block" })
export class Block extends Model<Block, IBlocksCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  typeId: number;

  @Column({
    type: DataType.STRING,
  })
  created_by: string;

  @Column({
    type: DataType.INTEGER,
  })
  parent: number;

  @Column({
    type: DataType.INTEGER,
  })
  order_index: number;

  @BelongsToMany(() => Property, () => BlockProperty)
  roles: Property[];
}
