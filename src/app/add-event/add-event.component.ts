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
  @Input() onOff: boolean
  @Input() editId
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
    if (this.editId.edit) {
      // alert('Click Add to save event. Old data been delete.')
      this.takeInfo(this.editId.id)
    } else {
      this.formatToForm(this.day)
    }
  }
  ngOnInit() {
  }
  saveEvent(){
    if (this.text.trim() && this.title.trim()) {
      let changeEvent: EventMy[] = this.eventsMy
      changeEvent = changeEvent.filter( event => event.id == this.editId.id)
      changeEvent[0].title = this.title
      changeEvent[0].text = this.text
      this.onAddMyEvent.emit(this.event)
      this.onSelectDay.emit(this.day)
    }
  }
  takeInfo(id){
    let editEvent: EventMy[] = this.eventsMy
    editEvent = editEvent.filter( event => event.id == id)
    this.title = editEvent[0].title
    this.text = editEvent[0].text
    this.time = ('0' + editEvent[0].date.getHours()).slice(-2) + ':' +
      ('0' + editEvent[0].date.getMinutes()).slice(-2)
    console.log('time edit:', this.time)
    console.log('event edit: ', editEvent)
    this.formatToForm(editEvent[0].date)
  }
  formatToForm(dat) {
    this.date = dat.getFullYear() + '-' +
      ('0' + (dat.getMonth() + 1)).slice(-2) + '-' + ('0' + dat.getDate()).slice(-2)
    this.time = ('0' + dat.getHours()).slice(-2) + ':' + ('0' + dat.getMinutes()).slice(-2)
    console.log('date: ', dat, ' - time: ', dat)
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
        alert('There is already an event at this time! Chose any other time.')
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
