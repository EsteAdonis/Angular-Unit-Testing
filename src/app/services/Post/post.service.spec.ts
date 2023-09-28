import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { of } from "rxjs";
import { Post } from "src/app/models/Post";
import { TestBed } from "@angular/core/testing";

describe('Post Service', () => {
  const POSTS: Post[] = [
    { id: 1, body: 'Body1', title: 'title 1' },
    { id: 2, body: 'Body2', title: 'title 2' },
    { id: 1, body: 'Body3', title: 'title 3' },
  ];  
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: HttpClient, useValue: httpClientSpyObj }
      ]
    })
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;;
  });

  describe('getPost()', () => {
    it('Should return expected posts when getPosts is called', () => {
      httpClientSpy.get.and.returnValue(of(POSTS));

      postService.getPost().subscribe({
        next: posts => expect(posts).toEqual(POSTS),
        error: () => { },
      });

      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })
  });

  describe('deletePost()', () => {
    it('Should return true when deletePosts is called', () => {
      httpClientSpy.delete.and.returnValue(of(true));

      postService.deletePost(POSTS[1]).subscribe({
        next: posts => expect(posts).toEqual(true),
        error: () => { },
      });

      expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
    })
  });  
})