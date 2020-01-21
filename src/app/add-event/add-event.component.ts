import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";
import {EventsMakerService} from "../services/events-maker.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnChanges {

  @Input() day
  @Input() onOff: boolean
  @Input() editId
  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>()

  event: EventMy
  date = ''
  time = ''
  title = 'Title'
  text = 'Text'
  id: number
  dateGet: Date

  constructor(private eventMaker: EventsMakerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.editId.edit) { // если редактируем событие
      this.takeInfo(this.editId.id)
    } else {
      this.formatToForm(this.day)
    }
  }
  ngOnInit() {
  }
  saveEvent() { // сохранение редактируемого события
    if (this.text.trim() && this.title.trim()) {
      const changeEvent: EventMy[] = this.eventMaker.events
      changeEvent[0] = changeEvent.find( event => event.id === this.editId.id)
      changeEvent[0].title = this.title
      changeEvent[0].text = this.text
      this.onSelectDay.emit(this.day)
      this.editId.edit = false
      localStorage.setItem('events', JSON.stringify(this.eventMaker.events))
    }
  }
  takeInfo(id){ // взять данные из редактируемого события
    let editEvent: EventMy[] = this.eventMaker.events
    editEvent = editEvent.filter( event => event.id === id)
    this.title = editEvent[0].title
    this.text = editEvent[0].text
    this.time = ('0' + (new Date(Date.parse(editEvent[0].date))).getHours()).slice(-2) + ':' +
      ('0' + (new Date(Date.parse(editEvent[0].date))).getMinutes()).slice(-2)
    this.formatToForm((new Date(Date.parse(editEvent[0].date))))
  }
  formatToForm(dat) { // готовим данные для формы
    this.date = dat.getFullYear() + '-' +
      ('0' + (dat.getMonth() + 1)).slice(-2) + '-' + ('0' + dat.getDate()).slice(-2)
    this.time = ('0' + dat.getHours()).slice(-2) + ':' + ('0' + dat.getMinutes()).slice(-2)
  }
  onAdd() { // добавляем событие
    if (this.text.trim() && this.title.trim()) {
      this.dateGet = new Date(this.date)
      this.dateGet.setHours(+this.time.slice(0, 2), +this.time.slice(-2))
      this.event = {
        date: this.dateGet,
        title: this.title,
        text: this.text,
      }
      if (this.eventMaker.timeBusy(this.event.date.valueOf())) {
        alert('Time busy! Chose any other time.');
      } else {
        this.eventMaker.updateEvents(this.event);
        this.onSelectDay.emit(this.day);
      }
    }
  }
}
