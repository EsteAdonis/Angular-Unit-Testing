import { TestBed } from '@angular/core/testing'
import { Post } from "src/app/models/Post";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { PostService } from 'src/app/services/Post/post.service';

class mockPostService {
  getPost() { }
  deletePost(post: Post) {
    return of(true);
  }
}

describe('PostsComponent', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let postService: any;

  beforeEach(() => {
    POSTS = [
      { id: 1, body: 'Body1', title: 'title 1' },
      { id: 2, body: 'Body2', title: 'title 2' },
      { id: 1, body: 'Body3', title: 'title 3' },
    ];

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
          {
            provide: PostService,
            useClass: mockPostService,
          }
      ]
    });

    component = TestBed.inject(PostsComponent);
    postService = TestBed.inject(PostService);
  });

  it('Should delete the selected post and remain two records', () => {
    component.posts = POSTS;
    component.delete(POSTS[1]);
    expect(component.posts.length).toBe(2);
  });

  it('Should call the delete method in Post Service Only Once', () => {
    spyOn(postService, 'deletePost').and.returnValue(of(true));
    component.posts = POSTS;
    component.delete(POSTS[2]);
    expect(postService.deletePost).toHaveBeenCalledTimes(1);
  });

  it('Should delete the actual selected Post in Posts', () => {
    component.posts = POSTS;
    component.delete(POSTS[2]);
    for (let post of component.posts) {
      expect(post).not.toEqual(POSTS[2]);
    }
  });
})