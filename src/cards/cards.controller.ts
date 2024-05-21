import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { CardsService } from './cards.service'
import { Card } from './cards.entity'
import { CreateCardDto } from './dto/create-card.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { OwnerGuard } from '../guards/owner.guard'
import { SetMetadata } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('Cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all cards' })
  @ApiResponse({ status: 200, description: 'Return all cards.' })
  findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @SetMetadata('resourceType', 'card')
  @ApiOperation({ summary: 'Get card by ID' })
  @ApiResponse({ status: 200, description: 'Return card by ID.' })
  findOne(@Param('id') id: number): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: 201, description: 'The card has been successfully created.' })
  create(@Body() createCardDto: CreateCardDto, @Req() request): Promise<Card> {
    const userId = request.user.id;
    console.log('Creating card with userId:', userId); // Логирование
    return this.cardsService.create(createCardDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @SetMetadata('resourceType', 'card')
  @ApiOperation({ summary: 'Delete card' })
  @ApiResponse({ status: 200, description: 'The card has been successfully deleted.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.cardsService.remove(id);
  }
}
