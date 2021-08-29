import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post/post.service';
import { AppService } from '../app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../post/entities';
import { Repository } from 'typeorm';

describe('AppService', () => {
  let service: AppService;
  let postService: PostService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    postService = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('PostService', () => {
    it('should be defined', () => {
      expect(postService).toBeDefined();
    });
  });

  describe('PostRepository', () => {
    it('should be defined', () => {
      expect(postRepository).toBeDefined();
    });
  });

  describe('getHello', () => {
    it('should return a string', () => {
      const result = service.getHello();

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThanOrEqual(0);
      expect(result).toBe('Hello, world!');
    });
  });

  describe('getPosts', () => {
    it('should return array of posts', async () => {
      const mockPost = { id: 1, body: 'abcdefg', createdAt: new Date() };

      jest.spyOn(postRepository, 'find').mockResolvedValueOnce([mockPost]);
      const posts = await service.getPosts();

      expect(postRepository.find).toHaveBeenCalled();
      expect(posts.length).toBeGreaterThanOrEqual(0);
      expect(posts[0]).toBeDefined();
      expect(typeof posts[0].id).toBe('number');
      expect(typeof posts[0].body).toBe('string');
      expect(posts[0].createdAt).toBeInstanceOf(Date);
    });
  });
});
