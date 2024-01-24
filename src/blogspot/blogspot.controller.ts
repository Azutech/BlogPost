// blogpost.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogspotService } from './blogspot.service';
import { BlogPost } from '../blogspot/schema/blogspot';

@Controller('blogposts')
export class BlogspotController {
  constructor(private readonly blogPostService: BlogspotService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: { title: string; content: string; author: string }): Promise<BlogPost> {
    const { title, content, author } = body;
    return this.blogPostService.create(title, content, author);
  }

  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost | null> {
    return this.blogPostService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ): Promise<BlogPost | null> {
    const { title, content } = body;
    const updatedPost = await this.blogPostService.update(id, title, content);

    if (!updatedPost) {
      // Handle case where update was unsuccessful
      throw new NotFoundException(`Blog post with ID ${id} not found.`);
    }

    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    console.log(`Deleting blog post with ID: ${id}`);
  try {
    await this.blogPostService.delete(id);
    console.log(`Blog post with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new InternalServerErrorException('Error deleting blog post.');
  }
  }
}

