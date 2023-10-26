import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUserDto {
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @Field()
    @IsEmail()
    email: string;
}

@InputType()
export class UpdateUserDto {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    username?: string;

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    email?: string;
}
