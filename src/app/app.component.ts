import { Component } from '@angular/core';

export interface EventMy {
  date: Date
  title: string
  text: string
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectDay: Date
  events: EventMy[] = [
    {date: new Date(new Date().setHours(0)), title: 'Sleep', text: 'I need sleep', id: 1},
    {date: new Date(), title: 'Coding', text: 'Just do it!', id: 2},
    {date: new Date('December 17, 2019 23:00:00'), title: 'Dead line', text: 'work is end', id: 3},
  ]

  chooseDate(date) {
    this.selectDay = new Date(date)
    console.log('select day: ', this.selectDay)
    //console.log(this.events)
  }
}
