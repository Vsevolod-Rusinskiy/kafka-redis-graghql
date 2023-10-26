import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NewsType {
    @Field(() => ID)
    id?: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    category: string;

    @Field()
    author: string;

    @Field()
    date: Date;
}
