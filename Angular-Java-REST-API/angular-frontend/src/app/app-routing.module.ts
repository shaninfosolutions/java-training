import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserComponent } from './user/user.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = 
[{ path: 'user', component: UserComponent },
{ path: '', redirectTo: 'user', pathMatch: 'full' },
{ path: 'create-user', component: UserCreateComponent },
{ path: 'update-user/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
