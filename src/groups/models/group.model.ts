import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { GroupMember } from "../../group-members/models/group-member.model";

interface IGroupCreationAttr {
  name: string;
  icon?: string;
  description?: string;
  created_by: number;
}

@Table({ tableName: "groups" })
export class Group extends Model<Group, IGroupCreationAttr> {
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
    allowNull: true,
  })
  icon?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  created_by: number;

  @HasMany(() => GroupMember)
  members: GroupMember[];
}
