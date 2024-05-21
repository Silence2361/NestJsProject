import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { validationException } from "src/exceptions/validation.exceprion"

///Pipe - преобразовать входные данные , строку переводить в число. Второе, валидация входных данных

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
   async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate (obj)

        if(errors.length){
            let messages = errors.map(err => {
                return `$(err.property)  ${Object.values(err.constraints).join(', ')}`
            })
            throw new validationException(messages)
        }
        return value
    }
}