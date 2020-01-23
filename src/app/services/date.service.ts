import { Injectable } from '@angular/core';
import {EventMy} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  timeToForm(date: EventMy["date"]): string { // форматирование времени для формы
    return ('0' + (new Date(Date.parse(date))).getHours()).slice(-2) + ':' +
      ('0' + (new Date(Date.parse(date))).getMinutes()).slice(-2);
  }
  dateToForm(date: EventMy["date"]): string { // форматирование даты для формы
    return ( date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
  }
}
