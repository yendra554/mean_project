import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreatedComponent } from './posts/post-created/post-created/post-created.component';
import { PostListComponent } from './posts/post-list/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    component:PostListComponent
  },
  {
    path: 'create',
    component: PostCreatedComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreatedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
