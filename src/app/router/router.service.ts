import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { QuestionCardComponent } from '../question-card/question-card.component';

const routers: Routes = [
  { path: '', component: SearchBarComponent },
  { path: 'question/:category/:min_date/:max_date/:value', component: QuestionCardComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})

export class RouterService {}