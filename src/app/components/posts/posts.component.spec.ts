import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Post } from "src/app/models/Post";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { PostService } from 'src/app/services/Post/post.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PostsComponent', () => {
  const POSTS: Post[] = [
    { id: 1, body: 'Body1', title: 'title 1' },
    { id: 2, body: 'Body2', title: 'title 2' },
    { id: 1, body: 'Body3', title: 'title 3' },
  ];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(() => {
    mockPostService = jasmine.createSpyObj('PostService', ['getPost', 'deletePost']);
    mockPostService.deletePost.and.returnValue(of(true));
    mockPostService.getPost.and.returnValue(of(POSTS));

    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [
        { provide: PostService, useValue: mockPostService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    component.posts = POSTS;
  });

  it('Should delete the selected post and remain two records', () => {
    component.delete(POSTS[1]);
    expect(component.posts.length).toBe(2);
  });

  it('Should call the deletePost method in Post Service Only Once', () => {
    component.delete(POSTS[2]);
    expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
  });

  it('Should delete the actual selected Post in Posts', () => {
    component.delete(POSTS[2]);
    for (let post of component.posts) {
      expect(post).not.toEqual(POSTS[2]);
    }
  });

  it('Should set posts from the service directly', () => {
    component.posts = [];
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });
})