import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Comment } from './comments.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Return all comments.' })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get comment by ID' })
  @ApiResponse({ status: 200, description: 'Return comment by ID.' })
  findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.commentsService.remove(id)
  }
}
