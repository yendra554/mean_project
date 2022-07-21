import { Injectable } from '@angular/core';
import { Post } from 'src/app/services/interface/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private  posts: Post[] =[];
  private postUpdated = new Subject<Post[]>();  //payLoad
  constructor(private http: HttpClient) { }
  getPosts(){

    this.http.get<{message: string , posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    })
  }

  getPostUpdatedListener(){
    return this.postUpdated.asObservable();

  }

  addPost(name: string,  number: string, address: string,content: string,){

    const post: Post ={ id: null,name: name,number:number,address: address, content: content, };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }

}
