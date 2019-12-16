import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventMy} from "../app.component";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnChanges {

  @Input() eventsMy: EventMy[]
  @Input() onOff: boolean
  @Input() day: Date
  @Input() showAdE: boolean

  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>()
  @Output() viewOnOff: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() viewAdd: EventEmitter<boolean> = new EventEmitter<boolean>()

  firstDay: Date
  tempArr: Array<any>
  theMonth: number
  monthView: Date
  selectDay: Date
  today = new Date()

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.refresh()
  }
  ngOnInit() {
    this.refresh()
  }
  showAdd(){ // скрыть/показать компонент добавления события
    this.viewAdd.emit(!this.showAdE)
  }
  paintEvent(day){ // закрасить дни с событиями
    for (let i = 0; i < this.eventsMy.length; i++) {
      if (((new Date(Date.parse(this.eventsMy[i].date))).getMonth() == this.theMonth) &&
        ((new Date(Date.parse(this.eventsMy[i].date))).getDate() == +day))
        return true
    }
  }
  painToday(day){ // выделить текущий день
    let temp = new Date()
    let tempDay = temp.getDate()
    if (+day == tempDay && this.monthView.getMonth() == temp.getMonth()) return true
  }
  onClick(event) { // по клику на день переходим на вид этого дня
    if (event.target.innerText != '' && event.target.innerText != ' ') {
      this.selectDay = new Date(this.monthView.getFullYear(),
                                  this.monthView.getMonth(), event.target.innerText)
      this.onSelectDay.emit(this.selectDay)
      this.viewOnOff.emit(!this.onOff)
    }
  }
  onClickLeft() { // показать предыдущий месяц
    this.day.setMonth(this.day.getMonth()-1)
    this.refresh()
  }
  onClickRight() { // показать последующий месяц
    this.day.setMonth(this.day.getMonth()+1)
    this.refresh()
  }
  refresh() { // обновить представление месяца
    this.monthView = new Date(this.day)
    this.firstDay = new Date(this.day.getFullYear(), this.day.getMonth())
    this.tempArr = []
    this.theMonth = this.day.getMonth()
    this.addFreeDays()
    this.addNumbers()
  }
  getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }
  addFreeDays() {  // добавить пустые ячейки в календарь
    for (let i = 0; i < this.getDay(this.firstDay); i++) {
      this.tempArr.push(' ')
    }
  }
  addNumbers() { // добавить числа месяца
    while (this.firstDay.getMonth() == this.theMonth) {
      this.tempArr.push(new Date(this.firstDay))
      this.firstDay.setDate(this.firstDay.getDate() + 1);
    }
  }
}
