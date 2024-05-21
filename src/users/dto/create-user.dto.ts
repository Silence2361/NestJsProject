import { ApiProperty } from "@nestjs/swagger"
import { IsString , Length, IsEmail } from "class-validator"


export class createUserDto{

    @ApiProperty({example: "user@gmail.com" , description: "Email" })  
    @IsString({message:  'Must be string format'})
    @IsEmail({},{message: "Invalid email"})
    readonly email: string
    @ApiProperty({example: '12345678', description: 'Password'})
    @IsString({message:  'Must be string format'})
    @Length( 4, 16, {message: 'Less than 4 more than 16'})
    readonly password: string
}