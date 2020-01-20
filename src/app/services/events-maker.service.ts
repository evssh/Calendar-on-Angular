import { Injectable } from '@angular/core';
import {EventMy} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class EventsMakerService {

  constructor() { }

  events: EventMy[] = JSON.parse(localStorage.getItem('events')) || [
    {date: new Date('December 6, 2019 20:20:23'),
      title: 'Start coding', text: 'lazy me', id: 1},
    {date: new Date('December 12, 2019 06:05:32'),
      title: 'Morning?', text: 'good morning!', id: 2},
    {date: new Date('December 17, 2019 23:59:59'),
      title: 'Dead line', text: 'just do it!', id: 3},
    {date: new Date('December 31, 2019 23:59:59'),
      title: 'New Year!', text: 'happy New Year 2020 are welcome!', id: 4},
  ];
}
