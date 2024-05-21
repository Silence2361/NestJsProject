import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsInt } from 'class-validator'

export class CreateCardDto {
  @ApiProperty({ example: 'Card Title', description: 'Title of the card' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 'Card Description', description: 'Description of the card' })
  @IsString()
  description: string

  @ApiProperty({ example: 1, description: 'ID of the column to which the card belongs' })
  @IsInt()
  @IsNotEmpty()
  columnId: number
}