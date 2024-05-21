import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users-model'
import { createUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'
import {AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { ColumnEntity } from '../columns/columns.entity';
import { Card } from '../cards/cards.entity';
import { Comment } from '../comments/comments.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(ColumnEntity) private columnsRepository: typeof ColumnEntity,
    @InjectModel(Card) private cardsRepository: typeof Card,
    @InjectModel(Comment) private commentsRepository: typeof Comment,
    private roleService: RolesService,
  ) {}

    async createUser(dto: createUserDto){
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('ADMIN')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where:{email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user){
            await user.$add('role', role.id) 
            return dto
        }
        throw new HttpException('User or role did not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto){
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user){
            console.log(user)
            throw new HttpException("User not found" , HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user
        
    }

    private getRepositoryByResourceType(resourceType: string) {
        switch (resourceType) {
          case 'column':
            return this.columnsRepository;
          case 'card':
            return this.cardsRepository;
          case 'comment':
            return this.commentsRepository;
          default:
            throw new HttpException('Invalid resource type', HttpStatus.BAD_REQUEST);
        }
      }
    
      async getResourceById<T extends { userId: number }>(resourceType: string, id: number): Promise<T> {
        console.log('Resource Type:', resourceType); 
        console.log('Resource ID:', id); 
    
        const repository = this.getRepositoryByResourceType(resourceType) as any;
        const resource = await repository.findByPk(id);
        if (!resource) {
          throw new HttpException(`${resourceType} not found`, HttpStatus.NOT_FOUND);
        }
        return resource as T;

      }
    }
    

