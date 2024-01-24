import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BlogPost extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);