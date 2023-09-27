import { Post } from "src/app/models/Post";
import { PostComponent } from "./post.component";
import { first } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";


describe('Post Component', () => { 
  const post: Post = { id: 1, body: 'Body1', title: 'title 1' };
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;    
    comp.post = post;
  })

  it('Should create PostComponent using TestBed', () => {
    expect(comp).toBeDefined();
  });

  it('Should raise and event when the delete post is clicked', () => { 
    comp.post = post;
    comp.delete.pipe(first()).subscribe( selectedPost => {
      expect(selectedPost).toEqual(post);
    })

    comp.onDeletePost(new MouseEvent('click'));
  })

  it('Should render the post title in the anchor element', () => {
    fixture.detectChanges();
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  })  
});