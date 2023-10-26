import {Inject, Injectable} from '@nestjs/common';
import {Producer} from 'kafkajs';

@Injectable()
export class KafkaProducerService {

    constructor(@Inject('KAFKA_PRODUCER') private readonly producer: Producer) {
    }

    async send(topic: string, message: any) {
        await this.producer.connect();
        await this.producer.send({
            topic,
            messages: [{value: JSON.stringify(message)}],
        });
        await this.producer.disconnect();
    }
}
