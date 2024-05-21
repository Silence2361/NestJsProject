import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Comment } from './comments.entity'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private readonly commentRepository: typeof Comment,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.findAll()
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findByPk(id)
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.create(createCommentDto)
  }

  async update(id: number, updateCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id)
    if (!comment) {
      throw new Error('Comment not found')
    }
    await comment.update(updateCommentDto)
    return comment;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id)
    if (!comment) {
      throw new Error('Comment not found')
    }
    await this.commentRepository.destroy({ where: { id } })
  }
}
