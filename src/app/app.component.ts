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
  public viewMonth = true
  selectDay: Date = new Date()
  events: EventMy[] = [
    {date: new Date('December 6, 2019 20:20:23'),
      title: 'Start coding', text: 'lazy ass', id: 1},
    {date: new Date('December 12, 2019 06:05:32'),
      title: 'Morning?', text: 'goof morning!', id: 2},
    {date: new Date('December 12, 2019 23:05:45'),
      title: 'Real?', text: 'no bad', id: 3},
    {date: new Date('December 17, 2019 23:59:59'),
      title: 'Dead line', text: 'just do it!', id: 4},
    {date: new Date('December 31, 2019 23:59:59'),
      title: 'New Year!', text: 'happy New Year 2020 are welcome!', id: 5},
    // {date: new Date(),
    //     //   title: 'Live', text: 'is good!', id: 6},
  ];
  chooseDate(date) {
    this.selectDay = new Date(date)
  }
  changeView(onOf) {
    this.viewMonth = onOf
  }
}
