import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Post } from "src/app/models/Post";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { PostService } from 'src/app/services/Post/post.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PostsComponent', () => {
  const POSTS: Post[] = [
    { id: 1, body: 'Body1', title: 'title 1' },
    { id: 2, body: 'Body2', title: 'title 2' },
    { id: 1, body: 'Body3', title: 'title 3' },
  ];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  @Component({    // This class is used to avoid CUSTOM_ELEMENTS_SCHEMA
    selector: 'app-post',
    template: '<div></div>'
  })
    
  class FakePostComponent{  // Fake Child Component
    @Input() post!: Post;
  }

  beforeEach(() => {
    mockPostService = jasmine.createSpyObj('PostService', ['getPost', 'deletePost']);
    mockPostService.deletePost.and.returnValue(of(true));
    mockPostService.getPost.and.returnValue(of(POSTS));

    TestBed.configureTestingModule({
      declarations: [ PostsComponent, FakePostComponent ],
      providers: [
        { provide: PostService, useValue: mockPostService }
      ]
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

  it('Should create one post child Element for each post', () => {
    fixture.detectChanges();      
    const debugElement = fixture.debugElement;
    const postElement = debugElement.queryAll(By.css('.posts'));
    expect(postElement.length).toBe(POSTS.length);
  })
})