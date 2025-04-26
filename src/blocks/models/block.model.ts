import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Property } from "src/properties/models/property.model";
import { BlockProperty } from "./block-properties.model";
import { Device } from "src/devices/models/device.model";

interface IBlocksCreationAttr {
  typeId: number;
  created_by: string;
  parent: number;
  order_index: number;
  device_id: number;
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
  declare typeId: number;

  @Column({
    type: DataType.STRING,
  })
  declare created_by: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare parent: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare order_index: number;

  @ForeignKey(() => Device)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare device_id: number;

  @BelongsTo(() => Device)
  declare device: Device;

  @BelongsToMany(() => Property, () => BlockProperty)
  declare roles: Property[];
}
