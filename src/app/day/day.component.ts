import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnChanges {

  @Input() day
  @Input() eventsMy: EventMy[]
  // @Input() eventElement: EventMy

  hours: Array<number> = []
  tempArrEvent: Event[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventInDay()
  }

  ngOnInit() {
    this.pushHours()
    console.log(this.eventsMy)
    // console.log('ffff', this.day)
    // if (this.day) {this.eventInDay()}
  }

  eventInDay() {
    // console.log('ddd')
    this.tempArrEvent = []
    for (let i = 0; i < this.eventsMy.length; i++) {
      // console.log(this.eventsMy[i].date === this.day)
      if (this.eventsMy[i].date.setHours(0,0,0,0) === this.day.setHours(0,0,0,0)) {
        // console.log('events: ', this.eventsMy[i].title)
        this.tempArrEvent.push(this.eventsMy[i])
      }
    }
    console.log('tempArEvent',this.tempArrEvent)

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
