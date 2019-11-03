import { Component, OnInit } from '@angular/core';
import { ClientService } from '../api-client/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clientService:ClientService) { }

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
        questions.forEach(question => {
          this.questionText = question.question;
          this.difficultyValue = question.value;
          this.category = question.category.title;
          this.airdate = question.airdate.toString();
          this.answer = question.answer;
          console.log(question);
        })
      });
    }
  }
}
