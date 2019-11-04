import { Component, OnInit } from '@angular/core';
import { ClientService } from '../api-client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question/question';
import { Category } from '../category/category';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clientService:ClientService, private router: Router) { }

  currentQuestion:Question;
  questionArr:Question[];
  questionIdx = 0;

  questionText:string;
  category:string;
  difficultyValue:number;
  airdate:string;
  answer:string;

  ngOnInit() {
    let map = this.route.snapshot.paramMap;
    if (map.has('category') && map.has('min_date') && map.has('max_date') && map.has('value')) {

      this.clientService.getQuestion(Number(map.get('value')), Number(map.get('category')), 
      map.get('min_date'), map.get('max_date'), 0)
      .subscribe(questions => {
        this.questionArr = questions;
        this.currentQuestion = this.questionArr[this.questionIdx];
      });
    }
  }

  onNext() {
    this.questionIdx += 1;
    this.currentQuestion = this.questionArr[this.questionIdx];
    
    if (this.questionArr[this.questionIdx]) {
      if (this.questionArr[this.questionIdx].value === null) {
        // Sometimes the value is null, so to avoid $null we make it zero
        this.questionArr[this.questionIdx].value = 0;
      }
      if (this.questionArr[this.questionIdx].answer) {
        // Sometimes the answer will have random <i> tags. This regex removes
        this.questionArr[this.questionIdx].answer = this.questionArr[this.questionIdx].answer.replace(/<\/?[^>]+(>|$)/g, '');
      }
    }

    // If the user walks off the arr of questions, then display this stub data
    if (!this.questionArr[this.questionIdx]) {
      this.currentQuestion = new Question();
      this.currentQuestion.question = "No more results, search again!";
      this.currentQuestion.value = 0;
      this.currentQuestion.airdate = new Date();
      this.currentQuestion.answer = '';
      this.currentQuestion.category = new Category();
    }
  }

  onLogo() {
    this.router.navigate(['']);
  }
}
