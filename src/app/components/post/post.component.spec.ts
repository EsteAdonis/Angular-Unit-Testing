import { Post } from "src/app/models/Post";
import { PostComponent } from "./post.component";
import { first } from "rxjs";


describe('Post Component', () => { 
  let comp: PostComponent;
  let post: Post;

  beforeEach(() => {
    comp = new PostComponent();
    post = { id: 1, body: 'Body1', title: 'title 1' };
  })

  it('Should raise and event when the delete post is clicked', () => { 
    comp.post = post;
    comp.delete.pipe(first()).subscribe( selectedPost => {
      expect(selectedPost).toEqual(post);
    })

    comp.onDeletePost(new MouseEvent('click'));
  })
});