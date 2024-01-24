import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from '../blogspot/schema/blogspot';

@Injectable()
export class BlogspotService {
  constructor(@InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPost>) {}

  async create(title: string, content: string, author: string): Promise<BlogPost> {
    const blogPost = new this.blogPostModel({ title, content, author });
    return blogPost.save();
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostModel.find().exec();
  }

  async findOne(id: string): Promise<BlogPost | null> {
    return this.blogPostModel.findById(id).exec();
  }

  async update(id: string, title: string, content: string): Promise<BlogPost | null> {
    return this.blogPostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.blogPostModel.findByIdAndDelete(id).exec();
  }
}
