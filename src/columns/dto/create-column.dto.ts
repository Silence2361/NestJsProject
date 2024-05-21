import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'Column Title', description: 'Title of the column' })
  @IsNotEmpty()
  title: string;
}