import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment', description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({ example: 1, description: 'ID of the card the comment belongs to' })
  @IsInt()
  @IsNotEmpty()
  cardId: number

  @ApiProperty({ example: 1, description: 'ID of the user creating the comment' })
  @IsInt()
  @IsNotEmpty()
  userId: number
}
