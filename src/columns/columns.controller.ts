import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { ColumnsService } from './columns.service'
import { ColumnEntity } from './columns.entity'
import { CreateColumnDto } from './dto/create-column.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { OwnerGuard } from '../guards/owner.guard'
import { SetMetadata } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('Columns')
@ApiBearerAuth()
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all columns' })
  @ApiResponse({ status: 200, description: 'Return all columns.' })
  findAll(): Promise<ColumnEntity[]> {
    return this.columnsService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @SetMetadata('resourceType', 'column')
  @ApiOperation({ summary: 'Get column by ID' })
  @ApiResponse({ status: 200, description: 'Return column by ID.' })
  findOne(@Param('id') id: number): Promise<ColumnEntity> {
    return this.columnsService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, description: 'The column has been successfully created.' })
  create(@Body() createColumnDto: CreateColumnDto, @Req() request): Promise<ColumnEntity> {
    const userId = request.user.id
    console.log('Creating column with userId:', userId)
    return this.columnsService.create(createColumnDto, userId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @SetMetadata('resourceType', 'column')
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 200, description: 'The column has been successfully deleted.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.columnsService.remove(id)
  }
}