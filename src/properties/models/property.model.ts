import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BlockProperty } from "src/blocks/models/block-properties.model";
import { Block } from "src/blocks/models/block.model";
import { Device } from "src/devices/models/device.model";

interface IPropertyCreationAttr {
  name: string;
  description?: string;
  device_id: number;
}

@Table({ tableName: "properties" })
export class Property extends Model<Property, IPropertyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @ForeignKey(() => Device)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  device_id: number;

  @BelongsTo(() => Device)
  device: Device;

  @BelongsToMany(() => Block, () => BlockProperty)
  roles: Block[];
}
