import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() day
  @Input() events

  hours: Array<number> = []
  tempArrEvent: Event[] = []

  constructor() { }

  ngOnInit() {
    this.pushHours()
    console.log(this.events)
  }

  eventInDay() {
    for (let i = 0; i < this.events.length; i++) {

    }
  }

  pushHours() {
    for (let i = 0; i < 25; i++) {
      this.hours.push(i)
    }
  }

  onClickLeft() {
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 1)
  }

  onClickRight() {
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1)
  }
}
