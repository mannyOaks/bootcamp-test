import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities';
import { PostService } from '../post.service';

describe('PostService', () => {
  let service: PostService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('PostRepository', () => {
    it('should be defined', () => {
      expect(postRepository).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return array of posts', async () => {
      const mockPost = { id: 1, body: 'abcdefg', createdAt: new Date() };

      jest.spyOn(postRepository, 'find').mockResolvedValueOnce([mockPost]);
      const posts = await service.findAll();

      expect(postRepository.find).toHaveBeenCalled();
      expect(posts.length).toBeGreaterThanOrEqual(0);
      expect(posts[0]).toBeDefined();
      expect(typeof posts[0].id).toBe('number');
      expect(typeof posts[0].body).toBe('string');
      expect(posts[0].createdAt).toBeInstanceOf(Date);
    });
  });
});
