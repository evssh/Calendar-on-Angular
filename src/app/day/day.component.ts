import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnChanges {

  @Input() day
  @Input() eventsMy: EventMy[]
  @Input() onOffD: boolean

  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>()

  hours: Array<number> = []
  tempArrEvent: EventMy[]
  showArrEvents: EventMy[]

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventInDay()
    this.showEvents()
  }

  ngOnInit() {
    this.pushHours()
  }

  showEvents() {
      this.showArrEvents = []
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < this.tempArrEvent.length; j++) {
        let time = this.tempArrEvent[j].date.getHours()
        if (i <= time && time < i + 1) {
          this.showArrEvents[i] = this.tempArrEvent[j]
        }
      }
        if (!this.showArrEvents[i]) {
          let puttime = new Date(this.day)
          puttime.setHours(i)
          this.showArrEvents[i] = {date: puttime, title: '', text: ''}
        }
    }
  }
  eventInDay() {
    this.tempArrEvent = []
    for (let i = 0; i < this.eventsMy.length; i++) {
      let buf1 = new Date(this.eventsMy[i].date)
      let buf2 = new Date(this.day)
      if ( buf1.setHours(0,0,0,0) === buf2.setHours(0,0,0,0)) {
        this.tempArrEvent.push(this.eventsMy[i])
      }
    }
  }
  pushHours() {
    for (let i = 0; i < 25; i++) {
      this.hours.push(i)
    }
  }
  onClickLeft() {
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 1)
    this.eventInDay()
    this.showEvents()
    this.onSelectDay.emit(this.day)
  }
  onClickRight() {
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1)
    this.eventInDay()
    this.showEvents()
    this.onSelectDay.emit(this.day)
  }
}
