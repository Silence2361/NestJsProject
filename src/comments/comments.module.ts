import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { Comment } from './comments.entity'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'
import { OwnerGuard } from '../guards/owner.guard'

@Module({
  imports: [
    SequelizeModule.forFeature([Comment]),
    AuthModule,
    UsersModule, 
  ],
  providers: [CommentsService, OwnerGuard], 
  controllers: [CommentsController],
})
export class CommentsModule {}