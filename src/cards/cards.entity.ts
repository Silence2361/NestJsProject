import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ColumnEntity } from '../columns/columns.entity'
import { User } from '../users/users.entity'

@Table({ tableName: 'cards' })
export class Card extends Model<Card> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => ColumnEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  columnId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => ColumnEntity)
  column: ColumnEntity;

  @BelongsTo(() => User)
  user: User;
}
