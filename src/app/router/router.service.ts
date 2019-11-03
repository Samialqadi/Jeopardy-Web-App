import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

const routers: Routes = [
  { path: '', component: SearchBarComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})

export class RouterService {}