import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { BlockProperty } from "src/blocks/models/block-properties.model";
import { Block } from "src/blocks/models/block.model";

interface IPropertyCreationAttr {
  name: string;
  description: string;
 
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
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(() => Block, () => BlockProperty)
  roles: Block[];
}
