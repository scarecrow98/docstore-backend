import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

/**
 * @see https://docs.nestjs.com/pipes
 */
export class BodyValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new HttpException({
                status: false,
                field: errors[0].property
            }, HttpStatus.OK);
        }

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [        
            String,
            Number,
            Array,
            Boolean,
            Object
        ];
        return !types.includes(metatype);
    }

}