import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UsersService } from '../users/users.service'

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    console.log('User', user)

    const resourceId = request.params.id
    const resourceType = this.reflector.get<string>('resourceType', context.getHandler())

    console.log('Resource ID', resourceId)
    
    console.log('Resource Type', resourceType)

    if (!resourceId || !resourceType) {
      return false
    }

    const resource = await this.usersService.getResourceById<{ userId: number }>(resourceType, resourceId)
    console.log('Resource:', resource)

    return resource && resource.userId === user.id
  }
}