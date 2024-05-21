import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Card } from './cards.entity'
import { CreateCardDto } from './dto/create-card.dto'

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private readonly cardModel: typeof Card) {}

  async findAll(): Promise<Card[]> {
    return this.cardModel.findAll()
  }

  async findOne(id: number): Promise<Card> {
    return this.cardModel.findByPk(id)
  }

  async create(createCardDto: CreateCardDto, userId: number): Promise<Card> {
    console.log('Creating card with userId:', userId)
    return this.cardModel.create({ ...createCardDto, userId })
  }

  async update(id: number, updateCardDto: CreateCardDto): Promise<Card> {
    const card = await this.findOne(id);
    card.title = updateCardDto.title || card.title
    card.description = updateCardDto.description || card.description
    card.columnId = updateCardDto.columnId || card.columnId
    await card.save()
    return card
  }

  async remove(id: number): Promise<void> {
    const card = await this.findOne(id)
    await card.destroy()
  }
}
