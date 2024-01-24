// blogpost.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
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
    return this.blogPostService.update(id, title, content);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.blogPostService.delete(id);
  }
}

