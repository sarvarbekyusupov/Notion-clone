import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface ITeamSpaceCreationAttr {
  name: string;
  description: string;
  icon: string;
}

@Table({ tableName: "TeamSpace" })
export class TeamSpace extends Model<TeamSpace, ITeamSpaceCreationAttr> {
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
  description: string;

  @Column({
    type: DataType.STRING,
  })
  icon: string;
}
