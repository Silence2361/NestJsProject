import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ColumnEntity } from './columns.entity'
import { CreateColumnDto } from './dto/create-column.dto'

@Injectable()
export class ColumnsService {
  constructor(@InjectModel(ColumnEntity) private readonly columnModel: typeof ColumnEntity) {}

  async findAll(): Promise<ColumnEntity[]> {
    return this.columnModel.findAll()
  }

  async findOne(id: number): Promise<ColumnEntity> {
    return this.columnModel.findByPk(id)
  }

  async create(createColumnDto: CreateColumnDto, userId: number): Promise<ColumnEntity> {
    console.log('Service create with userId:', userId)
    const column = await this.columnModel.create({ ...createColumnDto, userId })
    console.log('Created column:', column)
    return column
  }

  async update(id: number, updateColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    const column = await this.findOne(id)
    column.title = updateColumnDto.title || column.title
    await column.save()
    return column
  }

  async remove(id: number): Promise<void> {
    const column = await this.findOne(id)
    await column.destroy()
  }
}