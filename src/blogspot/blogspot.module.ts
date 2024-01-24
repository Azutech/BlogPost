import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogspotService } from './blogspot.service';
import { BlogspotController } from './blogspot.controller';
import { BlogPost, BlogPostSchema } from './schema/blogspot';

@Module({
  imports: [MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogPostSchema }])],
  controllers: [BlogspotController],
  providers: [BlogspotService],
})
export class BlogspotModule {}
