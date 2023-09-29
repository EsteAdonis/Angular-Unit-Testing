import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/services/Post/post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return '3';
        }
      }
    }
  };

  mockPostService = jasmine.createSpyObj(['getPost', 'updatePost', 'getPostById']);
  let mockLocation = jasmine.createSpyObj(['back']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render the post title in h2 template', () => {
    mockPostService.getPostById.and.returnValue(of({ id: 3, title: 'Title 1', body: 'Body 1' } as Post));
    fixture.detectChanges();   
    
    const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  })
});
