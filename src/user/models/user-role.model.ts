import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

interface IUserRoleCreationAttr {
  userId: number;
  roleId: number;
}

@Table({ tableName: "user-role" })
export class UserRole extends Model<UserRole, IUserRoleCreationAttr> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @Column({ type: DataType.INTEGER })
  declare roleId: number;
}
