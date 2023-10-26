import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsService } from '../services/news.service';
import { NewsType } from '../graphql-types/news.type';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';

@Resolver(() => NewsType)
export class NewsResolver {
    constructor(private readonly newsService: NewsService) {}

    @Query(() => [NewsType])
    async getNews(): Promise<NewsType[]> {
        return this.newsService.getNews();
    }

    @Query(() => NewsType)
    async getNewsById(@Args('id', { type: () => String }) id: string): Promise<NewsType> {
        return this.newsService.getNewsById(id);
    }

    @Mutation(() => NewsType)
    async createNews(@Args('createNewsInput') createNewsInput: CreateNewsDto): Promise<NewsType> {
        return this.newsService.createNews(createNewsInput);
    }

    @Mutation(() => NewsType)
    async updateNews(
        @Args('id', { type: () => String }) id: string,
        @Args('updateNewsInput') updateNewsInput: UpdateNewsDto,
    ): Promise<NewsType> {
        return this.newsService.updateNews(id, updateNewsInput);
    }

    @Mutation(() => NewsType)
    async deleteNews(@Args('id', { type: () => String }) id: string): Promise<NewsType> {
        return this.newsService.deleteNews(id);
    }
}

