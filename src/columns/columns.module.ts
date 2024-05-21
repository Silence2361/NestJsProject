import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ColumnsService } from './columns.service'
import { ColumnsController } from './columns.controller'
import { ColumnEntity } from './columns.entity'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'
import { OwnerGuard } from '../guards/owner.guard'

@Module({
  imports: [
    SequelizeModule.forFeature([ColumnEntity]),
    AuthModule,
    UsersModule, 
  ],
  providers: [ColumnsService, OwnerGuard], 
  controllers: [ColumnsController],
})
export class ColumnsModule {}