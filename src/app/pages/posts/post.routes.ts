import { Routes } from '@angular/router';
import { PostFormComponent } from '@pages/posts/post-form/post-form.component';
import { PostListComponent } from '@pages/posts/post-list/post-list.component';
import { PostShowComponent } from '@pages/posts/post-show/post-show.component';

export const POST_ROUTES: Routes = [
    {
        path: '',
        component: PostListComponent,
        title: 'title.posts.list',
    },
    {
        path: 'create',
        component: PostFormComponent,
        title: 'title.posts.create',
    },
    {
        path: ':id',
        component: PostShowComponent,
        title: 'title.posts.show',
    },
    {
        path: ':id/edit',
        component: PostFormComponent,
        title: 'title.posts.edit',
    },
];
