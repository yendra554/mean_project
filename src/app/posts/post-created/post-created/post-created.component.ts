import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/services/interface/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { imageType } from './image-type.validator';
@Component({
  selector: 'app-post-created',
  templateUrl: './post-created.component.html',
  styleUrls: ['./post-created.component.css'],
})
export class PostCreatedComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  public post: Post;
  private mode = 'create';
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      // number: new FormControl(null, {
      //   validators: [Validators.required, Validators.maxLength(10)],
      // }),
      // address: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [imageType],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            // number: postData.number,
            // address: postData.address,
            content: postData.content,
            imagePath: postData.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            // number: this.post.number,
            // address: this.post.address,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        // this.form.value.number,
        // this.form.value.address,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        // this.form.value.number,
        // this.form.value.address,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
