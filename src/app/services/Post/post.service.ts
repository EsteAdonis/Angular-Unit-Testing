import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostById(id: number): Observable<Post> { 
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  getPost(): Observable<Post[]> { 
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  deletePost(post: Post) {
    return this.http.delete(`http://jsonplaceholder.typicode.com/post/${post.id}`);
  }

  updatePost(post: Post) {
    return this.http.put(`http://jsonplaceholder.typicode.com/post/${post.id}`, post);
  }
}
