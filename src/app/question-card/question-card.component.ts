import { Component, OnInit } from '@angular/core';
import { ClientService } from '../api-client/client.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question/question';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clientService:ClientService) { }

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
        console.log(questions);
        this.questionArr = questions;
        console.log('HELLOOOOOOOOOO')

          this.currentQuestion = this.questionArr[this.questionIdx];
      });
    }
  }

  onNext() {
    this.questionIdx += 1 % this.questionArr.length;
    this.currentQuestion = this.questionArr[this.questionIdx];
  }
}
