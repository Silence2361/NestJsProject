import { Module, forwardRef } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './users-model.js'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from 'src/roles/roles-model'
import { UserRoles } from 'src/roles/user-roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { AuthModule } from 'src/auth/auth.module'
import { Post } from 'src/posts/posts.model'
import { ColumnEntity } from '../columns/columns.entity' 
import { Card } from '../cards/cards.entity'
import { Comment } from '../comments/comments.entity'



@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, ColumnEntity, Card, Comment, Role, UserRoles, Post]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
    exports: [
      UsersService
    ]
})
export class UsersModule {}
