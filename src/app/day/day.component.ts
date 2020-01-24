import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";
import {EventsMakerService} from "../services/events-maker.service";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnChanges {

  @Input() day;
  @Input() onOffD: boolean;
  @Input() showAdE: boolean;

  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onRemoveEvent = new EventEmitter<number>();
  @Output() onEditEvent = new EventEmitter<number>();
  @Output() viewAdd: EventEmitter<boolean> = new EventEmitter<boolean>();

  tempArrEvent: EventMy[];
  showArrEvents: EventMy[];

  constructor(private eventMaker: EventsMakerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngOnInit() {
  }
  refresh() {
    this.eventInDay();
    this.showEvents();
  }
  showAdd() { // показать/скрыть компонент редактирования
    this.viewAdd.emit(!this.showAdE);
  }
  editEvent(id) { // передать id редактируемого события
    this.onEditEvent.emit(id);
  }
  delete(event) {
    this.eventMaker.deleteEvent(event);
    this.refresh();
  }
  showEvents() { // показать события
      this.showArrEvents = [];
      for (let i = 0; i < 24; i++) {
        for (const ev of this.tempArrEvent) {
        const time = (new Date(Date.parse(ev.date))).getHours();
        if (i <= time && time < i + 1) { // для каждого часового интервала дня
          this.showArrEvents[i] = ev;
        }
      }
        if (!this.showArrEvents[i]) { // если в интервале нет события, заполнить пустыми значениями
          const puttime = new Date(this.day);
          puttime.setHours(i);
          puttime.setMinutes(0);
          this.showArrEvents[i] = {date: puttime, title: '', text: ''};
        }
    }
  }
  eventInDay() { // фильтруем все события конкретного дня
    this.tempArrEvent = [];
    for (const ev of this.eventMaker.events) {
      const buf1 = new Date(Date.parse(ev.date));
      const buf2 = new Date(this.day);
      if ( buf1.setHours(0, 0, 0, 0) === buf2.setHours(0, 0, 0, 0)) {
        this.tempArrEvent.push(ev);
      }
    }
  }
  onClickChangeDay(direction) { // смена дня
    if (direction === 'previous') {
      this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 1);
    }
    if (direction === 'next') {
      this.day = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1);
    }
    this.eventInDay();
    this.showEvents();
    this.onSelectDay.emit(this.day);
  }
}
