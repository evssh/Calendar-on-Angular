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
  @Input() onOffD: boolean

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
    console.log(this.eventsMy)
    // console.log('ffff', this.day)
    // if (this.day) {this.eventInDay()}
  }

  showEvents() {
      this.showArrEvents = []

      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < this.tempArrEvent.length; j++) {
        let time = this.tempArrEvent[j].date.getHours()
        if (i <= time && time < i + 1) {
          // console.log('yes')
          // console.log(this.showArrEvents[i])
          // console.log(this.tempArrEvent[j])

          this.showArrEvents[i] = this.tempArrEvent[j]
          // console.log('showArrEvents[i]', this.showArrEvents[i], ' i:', i)
        }
        // if ( (this.tempArrEvent[j].date => this.tempArrEvent[j].date.setHours(i, i, i, i))
        // && (this.tempArrEvent[j].date <= this.tempArrEvent[j].date.setHours( i + 1, 0,0,0)))
        // {
        //   console.log ('true beeee')
        // }
      }
        if (!this.showArrEvents[i]) {
          let puttime = new Date(this.day)
          puttime.setHours(i)
          this.showArrEvents[i] = {date: puttime, title: '', text: ''}
        }
    }

      console.log('AttTimer', this.showArrEvents)
  }

  eventInDay() {
    // console.log('ddd')
    this.tempArrEvent = []
    for (let i = 0; i < this.eventsMy.length; i++) {
      // console.log(this.eventsMy[i].date === this.day)
      let buf1 = new Date(this.eventsMy[i].date)
      let buf2 = new Date(this.day)
      if ( buf1.setHours(0,0,0,0) === buf2.setHours(0,0,0,0)) {
        // console.log('events: ', this.eventsMy[i].title)
        this.tempArrEvent.push(this.eventsMy[i])
      }
    }
    console.log('tempArEvent', this.tempArrEvent)

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
  }

  onClickRight() {
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1)
    this.eventInDay()
    this.showEvents()
  }
}
