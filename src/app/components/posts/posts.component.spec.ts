import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Post } from "src/app/models/Post";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { PostService } from 'src/app/services/Post/post.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../post/post.component';

describe('PostsComponent', () => {
  const POSTS: Post[] = [
    { id: 1, body: 'Body1', title: 'title 1' },
    { id: 2, body: 'Body2', title: 'title 2' },
    { id: 3, body: 'Body3', title: 'title 3' },
  ];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(() => {
    mockPostService = jasmine.createSpyObj('PostService', ['getPost', 'deletePost']);
    mockPostService.deletePost.and.returnValue(of(true));
    mockPostService.getPost.and.returnValue(of(POSTS));

    TestBed.configureTestingModule({
      declarations: [ PostsComponent, PostComponent ],
      providers: [
        { provide: PostService, useValue: mockPostService }
      ]
      , schemas: [NO_ERRORS_SCHEMA]
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

  // This sections is testing the child component

  it('Should create one post child Element for each post', () => {
    fixture.detectChanges();      
    const debugElement = fixture.debugElement;
    const postElement = debugElement.queryAll(By.css('.posts'));
    expect(postElement.length).toBe(POSTS.length);
  })

  it('Should create exact same number of Post Component with Post', () => {
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
    expect(postComponentDEs.length).toEqual(POSTS.length);
  });

  it('Should check whether exact post is sending to PostComponent', () => {
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
    let postComponentInstance = postComponentDEs[0].componentInstance as PostComponent;
    expect(postComponentInstance.post.title).toEqual(POSTS[0].title);
  });

  it('Should call delete method when post component button is clicked', () => {
    spyOn(component, 'delete');
    mockPostService.getPost.and.returnValue(of(POSTS));
    fixture.detectChanges();

    let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
        
    postComponentDEs[0]
      .query(By.css('button'))
      .triggerEventHandler('click', { preventDefault: () => { } });

    expect(component.delete).toHaveBeenCalledWith(POSTS[0]);

    for (let i = 0; i < postComponentDEs.length; i++)
    {
      postComponentDEs[i]  
        .query(By.css('button'))
        .triggerEventHandler('click', { preventDefault: () => { } });    
      
      expect(component.delete).toHaveBeenCalledWith(POSTS[1]);      
    }
  });
})