import {ConfigModule, ConfigService} from "@nestjs/config";
import {Kafka} from "kafkajs";
import {DynamicModule, Global, Module} from "@nestjs/common";

@Global()
@Module({
    imports: [ConfigModule],
})
export class KafkaModule {
    static register(): DynamicModule {
        return {
            module: KafkaModule,
            providers: [
                {
                    provide: 'KAFKA_PRODUCER',
                    useFactory: (configService: ConfigService) => {
                        const clientId = configService.get<string>('KAFKA_CLIENT_ID');
                        const broker = configService.get<string>('KAFKA_BROKER');
                        const kafka = new Kafka({ clientId, brokers: [broker] });
                        return kafka.producer();
                    },
                    inject: [ConfigService],
                },
                {
                    provide: 'KAFKA_CONSUMER',
                    useFactory: (configService: ConfigService) => {
                        const clientId = configService.get<string>('KAFKA_CLIENT_ID');
                        const broker = configService.get<string>('KAFKA_BROKER');
                        const groupId = configService.get<string>('KAFKA_GROUP_ID');
                        const kafka = new Kafka({ clientId, brokers: [broker] });
                        return kafka.consumer({ groupId });
                    },
                    inject: [ConfigService],
                },
            ],
            exports: ['KAFKA_PRODUCER', 'KAFKA_CONSUMER'],
        };
    }
}
