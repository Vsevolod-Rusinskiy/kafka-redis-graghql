import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateNewsDto {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    content: string;

    @Field()
    @IsString()
    category: string;

    @Field()
    @IsString()
    author: string;
}

@InputType()
export class UpdateNewsDto {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    title?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    content?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    category?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    author?: string;
}
