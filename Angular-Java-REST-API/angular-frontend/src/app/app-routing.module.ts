import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserComponent } from './user/user.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = 
[
{ path: 'user', component: UserComponent },
{ path: '', redirectTo: 'editor', pathMatch: 'full' },
{ path: 'create-user', component: UserCreateComponent },
{ path: 'update-user/:id', component: UserUpdateComponent },
{ path: 'editor',component: EditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
