import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas-mongoose/user.schema";
import {CategorySchema} from "./schemas-mongoose/category.schema";
import {NewsSchema} from "./schemas-mongoose/news.schema";
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {UserResolver} from "./graphql-resolvers/user.resolver";
import {CategoryResolver} from "./graphql-resolvers/category.resolver";
import {NewsResolver} from "./graphql-resolvers/news.resolver";
import {UserService} from "./services/user.service";
import {NewsService} from "./services/news.service";
import {CategoryService} from "./services/category.service";
import {KafkaModule} from "./kafka/kafka.module";
import {KafkaConsumerService} from "./kafka/kafka.consumer.service";
import {KafkaProducerService} from "./kafka/kafka.producer.service";
import {CacheModule} from "@nestjs/cache-manager";


@Module({
    imports: [
        CacheModule.register({
            isGlobal: true}),
        KafkaModule.register(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
        }),
        ConfigModule.forRoot(), MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }), MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'Category', schema: CategorySchema},
            {name: 'News', schema: NewsSchema},
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, UserResolver, CategoryResolver, NewsResolver, UserService, NewsService,
        CategoryService, KafkaConsumerService, KafkaProducerService],
})
export class AppModule {
}
