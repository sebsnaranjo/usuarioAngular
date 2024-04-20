import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [

  {path: 'home', component:ListComponent},
  {path: 'create', component:CreateComponent},
  {path: 'edit/:id', component:EditComponent},

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
