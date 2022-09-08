import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/services/interface/post.model';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-post-created',
  templateUrl: './post-created.component.html',
  styleUrls: ['./post-created.component.css'],
})
export class PostCreatedComponent implements OnInit {

  private mode = 'create';
  private postId :  string;
  private post : Post




  constructor( public postsService: PostsService , public route: ActivatedRoute) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if (paramMap.has('postId')){
         this.mode = 'edit';
         this.postId = paramMap.get('postId');
         this.post = this.postsService.getPost(this.postId);
      }
      else{
          this.mode =' create';
          this.postId = null;
      }
    });

  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.name,form.value.number,form.value.address, form.value.content);
    form.resetForm();
   }
}
