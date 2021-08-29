import { Injectable } from '@nestjs/common';
import { Post } from './post/entities';
import { PostService } from './post/post.service';

@Injectable()
export class AppService {
  constructor(private readonly postService: PostService) {}

  getHello(): string {
    return 'Hello, world!';
  }

  getPosts(): Promise<Post[]> {
    return this.postService.findAll();
  }
}
