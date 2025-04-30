
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface IPermissionCreationAttr {
  name: string;
  label: string;
  description: string;
}

@Table({ tableName: "permissions" })
export class Permission extends Model<Permission, IPermissionCreationAttr> {
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
    type: DataType.STRING,
  })
  label: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}
