import { Component } from '@angular/core';

export interface Event {
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
  events: Event[] = [
    {date: new Date(), title: 'Event test', text: 'Loren 10', id: 1},
    {date: new Date('December 18, 2019 00:00:00'), title: 'Dead line', text: 'Aaaaaaa!', id: 2}
  ]

  chooseDate(date) {
    this.selectDay = new Date(date)
    console.log('select day: ', this.selectDay)
    //console.log(this.events)
  }
}
