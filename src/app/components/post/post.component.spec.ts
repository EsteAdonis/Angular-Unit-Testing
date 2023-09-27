import { Post } from "src/app/models/Post";
import { PostComponent } from "./post.component";
import { first } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";


describe('Post Component', () => { 
  const post: Post = { id: 1, body: 'Body1', title: 'title 1' };
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent]
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;    
  })

  it('Should create PostComponent using TestBed', () => {
    expect(comp).toBeDefined;
  });

  it('Should raise and event when the delete post is clicked', () => { 
    comp.post = post;
    comp.delete.pipe(first()).subscribe( selectedPost => {
      expect(selectedPost).toEqual(post);
    })

    comp.onDeletePost(new MouseEvent('click'));
  })
});