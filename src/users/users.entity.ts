import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Card } from '../cards/cards.entity';
import { ColumnEntity } from '../columns/columns.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Card)
  cards: Card[];

  @HasMany(() => ColumnEntity)
  columns: ColumnEntity[];
}
