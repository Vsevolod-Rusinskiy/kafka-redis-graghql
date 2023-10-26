import {Inject, Injectable, UseInterceptors} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../schemas-mongoose/news.schema';
import { CreateNewsDto } from '../dto/news.dto';
import { UpdateNewsDto } from '../dto/news.dto';
import {KafkaProducerService} from "../kafka/kafka.producer.service";
import {CacheStore, CacheTTL} from "@nestjs/common/cache";
import {CACHE_MANAGER, CacheInterceptor} from "@nestjs/cache-manager";

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: Model<News>,
        private readonly kafkaProducerService: KafkaProducerService,
        @Inject(CACHE_MANAGER)
        private cacheManager: CacheStore,
    ) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(10)
    async getNews(): Promise<News[]> {
        return this.newsModel.find().exec();
    }

    async createNews(createNewsDto: CreateNewsDto): Promise<News> {
        const createdNews = new this.newsModel(createNewsDto);
        const savedNews = await createdNews.save();
        await this.kafkaProducerService.send('news_topic', { newsId: savedNews._id });
        await this.cacheManager.del('NewsService_getNews');
        return savedNews;
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(10)
    async getNewsById(id: string): Promise<News> {
        return this.newsModel.findById(id).exec();
    }

    async updateNews(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        const updatedNews = await this.newsModel.findByIdAndUpdate(id, updateNewsDto, { new: true }).exec();
        await this.cacheManager.del('NewsService_getNews');
        await this.cacheManager.del(`NewsService_getNewsById_${id}`);
        return updatedNews;
    }

    async deleteNews(id: string): Promise<News> {
        const deletedNews = await this.newsModel.findByIdAndDelete(id).exec();
        await this.cacheManager.del('NewsService_getNews');
        await this.cacheManager.del(`NewsService_getNewsById_${id}`);
        return deletedNews;
    }
}
