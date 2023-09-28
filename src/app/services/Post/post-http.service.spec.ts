import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { Post } from 'src/app/models/Post';

describe('postService (HttpClientTestingModule)', () => {
  const POSTS: Post[] = [
    { id: 1, body: 'Body1', title: 'title 1' },
    { id: 2, body: 'Body2', title: 'title 2' },
    { id: 3, body: 'Body3', title: 'title 3' },
    { id: 4, body: 'Body4', title: 'title 4' },    
  ];    
  let postService: PostService;
  let httpTestingController: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ PostService ],
        imports: [ HttpClientTestingModule ]
      });
      postService = TestBed.inject(PostService);
      httpTestingController = TestBed.inject(HttpTestingController);
  });
  
  describe('getPost()', () => {
    it('Should get post when getPost() is called', (done: DoneFn) => {
      postService.getPost().subscribe(data => {
        expect(data).toEqual(POSTS);
        done();
      });
      const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(request.request.method).toBe('GET');      
      request.flush(POSTS);
    })
  });

  describe('deletePost()', () => {
    it('Should delete post when deletePost() is called', (done: DoneFn) => {
      postService.deletePost(POSTS[1]).subscribe(data => {
        done();
      });
      const request = httpTestingController.expectOne(`http://jsonplaceholder.typicode.com/post/${POSTS[1].id}`);
      expect(request.request.method).toBe('DELETE');      
      request.flush([]);
    })    
  });
  
  afterEach(()=> {
    httpTestingController.verify();
  })
})