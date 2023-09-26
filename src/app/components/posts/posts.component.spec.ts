import { Post } from "src/app/models/Post";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";

describe('PostsComponent', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockService: any;

  beforeEach(() => {
    POSTS = [
      { id: 1, body: 'Body1', title: 'title 1' },
      { id: 2, body: 'Body2', title: 'title 2' },
      { id: 1, body: 'Body3', title: 'title 3' },
    ];

    mockService = jasmine.createSpyObj('postService', ['getPosts', 'deletePost']);
    mockService.deletePost.and.returnValue(of(true));    
    component = new PostsComponent(mockService);
  });

  it('Should delete the selected post and remain two records', () => {
    component.posts = POSTS;
    component.delete(POSTS[1]);
    expect(component.posts.length).toBe(2);
  });

  it('Should call the delete method in Post Service Only Once', () => {
    component.posts = POSTS;
    component.delete(POSTS[2]);
    expect(mockService.deletePost).toHaveBeenCalledTimes(1);
  });

  it('Should delete the actual selected Post in Posts', () => {
    component.posts = POSTS;
    component.delete(POSTS[2]);
    for (let post of component.posts) {
      expect(post).not.toEqual(POSTS[2]);
    }
  });
})