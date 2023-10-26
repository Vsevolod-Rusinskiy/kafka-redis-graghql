import {Inject, Injectable} from '@nestjs/common';
import { Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {

    constructor(@Inject('KAFKA_CONSUMER') private readonly consumer: Consumer) {
    }

    async onModuleInit() {
        await this.subscribe('news_topic');
    }

    async subscribe(topic: string) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log('Received message:', message.value.toString());
            },
        });
    }
}
