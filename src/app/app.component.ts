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
  idToEdit = {
    edit: false,
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
    // {date: new Date(),
    //     //   title: 'Live', text: 'is good!', id: 6},
  ];
  editEvent(id: number){
    console.log('id edit:', id)
    this.idToEdit = {
      edit: true,
      id: id
    }
    this.viewAdd = true
  }
  removeEvent(id: number) {
    console.log('id remove: ', id)
    this.events = this.events.filter( event => event.id !== id)
  }
  showAdd(onOff){
    this.viewAdd = onOff
  }
  chooseDate(date) {
    this.selectDay = new Date(date)
  }
  changeView(onOf) {
    this.viewMonth = onOf
  }
  updateMyEvent(event: EventMy) {
    if (event.id == 0) {
      event.id = this.events[this.events.length - 1].id + 1
      this.events.push(event)
      this.idToEdit = {
        edit: false,
        id: 0
      }
    } else {
      if (this.events.length == 0) { // если отсутствуют события заведем первое
        event.id = 1
        this.events.push(event)
      } else { // если пришел с id, значит удаляем старый объект и записываем новый, меняя id
        if (event.id) {
          let tempEvent = event
          this.removeEvent(event.id)
          tempEvent.id = 0
          this.updateMyEvent(tempEvent)
          console.log('change  id: ')
        } else { // если без id, то присвоим +1 к последнему
          event.id = this.events[this.events.length - 1].id + 1
          this.events.push(event)
        }
      }
    }

  }
}
