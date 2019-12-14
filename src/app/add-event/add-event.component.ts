import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnChanges {

  @Input() day
  @Input() eventsMy: EventMy[]
  @Output() onAddMyEvent: EventEmitter<EventMy> = new EventEmitter<EventMy>()
  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>()

  event: EventMy
  date = ''
  time = ''
  title = 'Title'
  text = 'Text'
  id: number
  dateGet: Date

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
   this.formatToForm()
  }

  ngOnInit() {
   this.formatToForm()
  }
  formatToForm() {
    this.date = this.day.getFullYear() + '-' +
      ('0' + (this.day.getMonth() + 1)).slice(-2) + '-' + ('0' + this.day.getDate()).slice(-2)
    this.time = ('0' + this.day.getHours()).slice(-2) + ':' + ('0' + this.day.getMinutes()).slice(-2)
    console.log('date: ', this.date, ' - time: ', this.time)
  }

  addEvent() {
    if (this.text.trim() && this.title.trim()) {
      this.dateGet = new Date(this.date)
      this.dateGet.setHours(+this.time.slice(0, 2), +this.time.slice(-2))
      this.event = {
        date: this.dateGet,
        title: this.title,
        text: this.text,
      }
      if (this.eventInArr(this.event.date.valueOf())) {
        alert('На это время уже имеется событие!')
      } else {
        this.onAddMyEvent.emit(this.event)
        this.onSelectDay.emit(this.day)
      }
    }
  }
  eventInArr(checkData) {
    for (let i = 0; i < this.eventsMy.length; i++){
      let dayEvAr = this.eventsMy[i].date.setMinutes(0,0,0).valueOf()
      if (dayEvAr <= checkData && checkData < dayEvAr + 3600000) {
        return true
      }
    }
  }

}
