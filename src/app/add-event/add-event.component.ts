import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";
import {EventsMakerService} from "../services/events-maker.service";
import {DateService} from "../services/date.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnChanges {

  @Input() day;
  @Input() onOff: boolean;
  @Input() editId;
  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>();

  event: EventMy;
  date = '';
  time = '';
  title = 'Title';
  text = 'Text';
  dateGet: Date;

  constructor(private eventMaker: EventsMakerService,
              private dateS: DateService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.editId.edit) { // если редактируем событие
      this.takeInfo(this.editId.id);
    } else {
      // this.formatToForm(this.day);
      this.date = this.dateS.dateToForm(this.day);
      this.time = this.dateS.timeToForm(this.day);
    }
  }
  ngOnInit() {
  }
  saveEvent() { // сохранение редактируемого события
    if (this.text.trim() && this.title.trim()) {
      this.formatToService();
      this.eventMaker.change(this.event);
      this.onSelectDay.emit(this.day);
    } else {
      alert('You need enter data. The event is not edited!');
    }
    this.editId.edit = false;
  }
  takeInfo(id) { // взять данные для формы из редактируемого события
    let editEvent: EventMy[] = this.eventMaker.events;
    editEvent = editEvent.filter( event => event.id === id);
    this.title = editEvent[0].title;
    this.text = editEvent[0].text;
    this.time = this.dateS.timeToForm(editEvent[0].date);
  }
  onAdd() { // добавляем событие
    if (this.text.trim() && this.title.trim()) {
      this.formatToService();
      if (this.eventMaker.timeBusy(this.event.date.valueOf())) {
        alert('Time busy! Chose any other time.');
      } else {
        this.eventMaker.pushEvent(this.event);
        this.onSelectDay.emit(this.day);
      }
    }
  }
  formatToService() { // подготовка данных для работы с сервисом событий
    this.dateGet = new Date(this.date);
    this.dateGet.setHours(+this.time.slice(0, 2), +this.time.slice(-2));
    this.event = {
      date: this.dateGet,
      title: this.title,
      text: this.text,
      id: this.editId.id,
    };
  }
}
