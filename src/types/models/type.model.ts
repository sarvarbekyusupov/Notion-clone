import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ITypeCreationAttr {
  name: string;
  description?: string;
}

@Table({ tableName: "types" })
export class Type extends Model<Type, ITypeCreationAttr> {
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
}
