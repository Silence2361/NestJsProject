import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CardsService } from './cards.service'
import { CardsController } from './cards.controller'
import { Card } from './cards.entity'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'
import { OwnerGuard } from '../guards/owner.guard'

@Module({
  imports: [
    SequelizeModule.forFeature([Card]),
    AuthModule,
    UsersModule, 
  ],
  providers: [CardsService, OwnerGuard], 
  controllers: [CardsController],
})
export class CardsModule {}