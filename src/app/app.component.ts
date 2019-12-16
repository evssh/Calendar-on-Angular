import { Component } from '@angular/core';

export interface EventMy {
  date: Date
  title: string
  text: string
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  viewMonth = true
  viewAdd = false
  idToEdit = { // идентификатор редактируемого события
    edit: false, // флаг необходимости редактирования
    id: 0
  }
  selectDay: Date = new Date()
  events: EventMy[] = [
    {date: new Date('December 6, 2019 20:20:23'),
      title: 'Start coding', text: 'lazy ass', id: 1},
    {date: new Date('December 12, 2019 06:05:32'),
      title: 'Morning?', text: 'goof morning!', id: 2},
    {date: new Date('December 12, 2019 23:05:45'),
      title: 'Real?', text: 'no bad', id: 3},
    {date: new Date('December 17, 2019 23:59:59'),
      title: 'Dead line', text: 'just do it!', id: 4},
    {date: new Date('December 31, 2019 23:59:59'),
      title: 'New Year!', text: 'happy New Year 2020 are welcome!', id: 5},
  ];
  editEvent(id: number){ // редактируемое событие
    this.idToEdit = {
      edit: true, // флаг необходимости редактирования
      id: id
    }
    this.viewAdd = true // показать форму редактирования
  }
  removeEvent(id: number) { // удаляем событие
    this.events = this.events.filter( event => event.id !== id)
  }
  showAdd(onOff){ // покажем форму добавления события
    this.viewAdd = onOff
  }
  chooseDate(date) { // меняем выбранную дату
    this.selectDay = new Date(date)
  }
  changeView(onOf) { // показать/скрыть представление месяца
    this.viewMonth = onOf
  }
  updateMyEvent(event: EventMy) { // обновить события
    if (this.events.length == 0) { // если нет событий, то заведем первое
      event.id = 1
      this.events.push(event)
    } else {
      event.id = this.events[this.events.length - 1].id + 1
      this.events.push(event)
    }
  }
}
