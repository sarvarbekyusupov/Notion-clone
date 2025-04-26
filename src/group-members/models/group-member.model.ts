import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Group } from "../../groups/models/group.model";

interface IGroupMemberCreationAttr {
  group_id: number;
  user_id: number;
  is_group_admin?: boolean;
}

@Table({ tableName: "group_members" })
export class GroupMember extends Model<GroupMember, IGroupMemberCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_group_admin?: boolean;

  @BelongsTo(() => Group)
  group: Group;
}
