import { Component } from '@angular/core';
import {EventsMakerService} from "./services/events-maker.service";

export interface EventMy {
  date: any;
  title: string;
  text: string;
  id?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  viewMonth = true;
  search = '';
  searchField = 'title';
  showList = false;
  viewAdd = false;
  idToEdit = { // идентификатор редактируемого события
    edit: false, // флаг необходимости редактирования
    id: 0
  };
  selectDay: Date = new Date();

  constructor(private eventMaker: EventsMakerService) {}
  editEvent(id: number) { // редактируемое событие
    this.idToEdit = {
      edit: true, // флаг необходимости редактирования
      id: id
    }
    this.viewAdd = true; // показать форму редактирования
  }
  showAdd(onOff) { // покажем форму добавления события
    this.viewAdd = onOff;
  }
  chooseDate(date) { // меняем выбранную дату
    this.selectDay = new Date(date);
  }
  changeView(onOf) { // показать/скрыть представление месяца
    this.viewMonth = onOf;
  }
}
