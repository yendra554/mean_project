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

  isLoading = false;
  public post : Post
  private mode = 'create';
  private postId :  string;




  constructor( public postsService: PostsService , public route: ActivatedRoute) {}

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title_name: postData.title_name , address: postData.address, number: postData.number, content: postData.content }
         });
      }
      else{
          this.mode =' create';
          this.postId = null;
      }
    });

  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title_name,form.value.number,form.value.address, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title_name,form.value.number,form.value.address, form.value.content
      );
    }
    form.resetForm();
  }
}
