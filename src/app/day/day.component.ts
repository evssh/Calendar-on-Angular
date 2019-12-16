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
  @Input() showAdE: boolean

  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>()
  @Output() onRemoveEvent = new EventEmitter<number>()
  @Output() onEditEvent = new EventEmitter<number>()
  @Output() viewAdd: EventEmitter<boolean> = new EventEmitter<boolean>()

  tempArrEvent: EventMy[]
  showArrEvents: EventMy[]

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventInDay()
    this.showEvents()
  }

  ngOnInit() {
  }
  showAdd(){ // показать/скрыть компонент редактирования
    this.viewAdd.emit(!this.showAdE)
  }
  editEvent(id){ // передать id редактируемого события
    this.onEditEvent.emit(id)
  }
  removeEvent(id) { // передать идентификатор удаляемого события
    this.onRemoveEvent.emit(id)
  }

  showEvents() { // показать события
      this.showArrEvents = []
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < this.tempArrEvent.length; j++) {
        let time = (new Date(Date.parse(this.tempArrEvent[j].date))).getHours()
        if (i <= time && time < i + 1) { // для каждого часового интервала дня
          this.showArrEvents[i] = this.tempArrEvent[j]
        }
      }
        if (!this.showArrEvents[i]) { // если в интервале нет события, заполнить пустыми значениями
          let puttime = new Date(this.day)
          puttime.setHours(i)
          this.showArrEvents[i] = {date: puttime, title: '', text: ''}
        }
    }
  }
  eventInDay() { // фильтруем все события конкретного дня
    this.tempArrEvent = []
    for (let i = 0; i < this.eventsMy.length; i++) {
      let buf1 = new Date(Date.parse(this.eventsMy[i].date))
      let buf2 = new Date(this.day)
      if ( buf1.setHours(0,0,0,0) === buf2.setHours(0,0,0,0)) {
        this.tempArrEvent.push(this.eventsMy[i])
      }
    }
  }
  onClickLeft() { // переход на предыдущий день
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 1)
    this.eventInDay()
    this.showEvents()
    this.onSelectDay.emit(this.day)
  }
  onClickRight() { // переход на последующий день
    this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1)
    this.eventInDay()
    this.showEvents()
    this.onSelectDay.emit(this.day)
  }
}
