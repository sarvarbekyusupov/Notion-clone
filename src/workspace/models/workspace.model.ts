
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface IWorkspaceCreationAttr {
  name: string;
  icon: string;
  category: string;
  management: string;
}

@Table({ tableName: "Workspace" })
export class Workspace extends Model<Workspace, IWorkspaceCreationAttr> {
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
  icon: string;

  @Column({
    type: DataType.STRING,
  })
  category: string;

  @Column({
    type: DataType.STRING,
  })
  management: string;
}
