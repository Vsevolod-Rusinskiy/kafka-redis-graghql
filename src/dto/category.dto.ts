import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryDto {
    @Field()
    @IsString()
    @MaxLength(50)
    name: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    description?: string;
}

@InputType()
export class UpdateCategoryDto {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    name?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    description?: string;
}
