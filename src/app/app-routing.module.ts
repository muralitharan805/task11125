import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { AccountUserDetailsComponent } from './account-user-details/account-user-details.component';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'account-user-form',
    component: AccountUserDetailsComponent,
  },
  {
    path: '',
    component: CardListComponent,
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
