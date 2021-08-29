import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from './post/entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts')
  async getPosts(): Promise<{ posts: Post[] }> {
    const posts = await this.appService.getPosts();
    return { posts };
  }
}
