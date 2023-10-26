import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class News extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: string;

    @Prop({ default: Date.now })
    date: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);

