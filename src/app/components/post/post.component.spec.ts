import { Post } from "src/app/models/Post";
import { PostComponent } from "./post.component";
import { first } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";


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

  // NOTE: Testing HTML <a> tag
  it('Should render the post title in the anchor element', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    comp.post = post;
    fixture.detectChanges();
    const postElement = HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  })

  // NOTE: Testing HTML <a> tag using debug element
  it('Should render the post title in the anchor element using debug element', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    comp.post = post;
    fixture.detectChanges();
    const postDebugElement = fixture.debugElement;
    const aElement: HTMLElement = postDebugElement.query(By.css('a')).nativeElement;
    expect(aElement?.textContent).toContain(post.title);
  })  

  it('Should raise and event when the delete post is clicked', () => { 
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

  it('Should render the post title in the anchor element using debug element', () => {
    fixture.detectChanges();
    const postElement = fixture.debugElement;
    const aElement = postElement.query(By.css('a')).nativeElement; 
    expect(aElement?.textContent).toContain(post.title);
  })   
});