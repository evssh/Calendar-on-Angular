import { Injectable } from '@angular/core';
import {EventMy} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class EventsMakerService {

  constructor() { }

  events: EventMy[] = JSON.parse(localStorage.getItem('events')) || [
    {date: new Date('December 6, 2019 20:20:23'),
      title: 'Start coding', text: 'Lets begin', id: 1},
    {date: new Date('December 12, 2019 06:05:32'),
      title: 'Morning?', text: 'good morning!', id: 2},
    {date: new Date('December 17, 2019 23:59:59'),
      title: 'Dead line', text: 'just do it!', id: 3},
    {date: new Date('December 31, 2019 23:59:59'),
      title: 'New Year!', text: 'happy New Year 2020 are welcome!', id: 4},
  ];

  timeBusy(checkData) { // в часовом интервале есть событие?
    for (const e of this.events) {
      const eventHour = (new Date(Date.parse(e.date))).setMinutes(0, 0, 0).valueOf();
      if (eventHour <= checkData && checkData < eventHour + 3600000) {
        return true;
      }
    }
  }

  pushEvent(event: EventMy) { // добавляет событие
    if (this.events.length === 0) { // если нет событий, то заведем первое
      event.id = 1;
      this.events.push(event);
    } else { // иначе добавить
      event.id = this.events[this.events.length - 1].id + 1;
      this.events.push(event);
    }
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  deleteEvent(event: EventMy) { // удаляем событие
    this.events = this.events.filter( e => e.id !== event.id);
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  change(event: EventMy) { // изменить событие
    this.events.forEach( (ev, i) => {
      if (ev.id === event.id) {
        this.events[i].text = event.text;
        this.events[i].title = event.title;
        this.events[i].date = event.date;
      }
    });
    localStorage.setItem('events', JSON.stringify(this.events));
  }
}
