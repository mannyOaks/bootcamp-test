import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { Post } from '../post/entities';
import { PostService } from '../post/post.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let postService: PostService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    postService = app.get<PostService>(PostService);
    postRepository = app.get<Repository<Post>>(getRepositoryToken(Post));
  });

  describe('PostRepository', () => {
    it('should be defined', () => {
      expect(postRepository).toBeDefined();
    });
  });

  describe('PostService', () => {
    it('should be defined', () => {
      expect(postService).toBeDefined();
    });
  });

  describe('AppService', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('getHello', () => {
    it('should return "Hello, world!"', () => {
      const result = appController.getHello();

      expect(typeof result).toBe('string');
      expect(result).toBe('Hello, world!');
    });
  });

  describe('getPosts', () => {
    it('should return object with array of posts', async () => {
      const mockPosts = [{ id: 1, body: 'abcdefg', createdAt: new Date() }];
      jest.spyOn(appService, 'getPosts').mockResolvedValueOnce(mockPosts);
      const posts = await appService.getPosts();

      expect(appService.getPosts).toHaveBeenCalled();
      expect(posts.length).toBeGreaterThanOrEqual(0);
      expect(posts[0]).toBeDefined();
      expect(typeof posts[0].id).toBe('number');
      expect(typeof posts[0].body).toBe('string');
      expect(posts[0].createdAt).toBeInstanceOf(Date);
    });
  });
});
