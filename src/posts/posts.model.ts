import { ApiProperty } from "@nestjs/swagger"
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles-model"
import { UserRoles } from "src/roles/user-roles.model"
import { User } from "src/users/users-model"


interface PostCreationAttribute{
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName:'posts'})
export class Post extends Model<Post, PostCreationAttribute>{


   
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

   
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})  
    image: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
    
    @BelongsTo(()=> User)
    author: User
}