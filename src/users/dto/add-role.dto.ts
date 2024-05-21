import { IsString, IsNumber  } from "class-validator"


export class AddRoleDto{
    @IsString({message: "Must be string"})
    readonly value: string
    @IsNumber({}, {message: 'Must be a number variable'})
    readonly userId: number
}