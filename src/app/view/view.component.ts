import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventMy} from "../app.component";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @Input() eventsMy: EventMy[]

  @Output() onSelectDay: EventEmitter<Date> = new EventEmitter<Date>()

  firstDay: Date
  tempArr: Array<any>
  theMonth: number
  monthView: Date
  selectDay: Date
  today = new Date()
  flagToday: number

  constructor() { }
  ngOnInit() {
    this.refresh()
    this.flagToday = this.today.getDate()
    console.log('flag:', this.flagToday)
  }
  onClick(event) {
    if (event.target.innerText != '') {
      this.selectDay = new Date(this.monthView.getFullYear(),
                                  this.monthView.getMonth(), event.target.innerText)
      this.onSelectDay.emit(this.selectDay)
    }
  }
  onClickLeft() {
    this.today.setMonth(this.today.getMonth()-1)
    this.refresh()
  }

  onClickRight() {
    this.today.setMonth(this.today.getMonth()+1)
    this.refresh()
  }

  refresh() {
    console.log(this.today)
    this.monthView = new Date(this.today)
    this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth())
    this.tempArr = []
    this.theMonth = this.today.getMonth() // месяцы в JS идут от 0 до 11, а не от 1 до 12
    this.addFreeDays()
    this.addNumbers()
  }
  getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }
  addFreeDays() {
    for (let i = 0; i < this.getDay(this.firstDay); i++) {
      this.tempArr.push(' ')
    }
  }
  addNumbers() {
    while (this.firstDay.getMonth() == this.theMonth) {
      this.tempArr.push(new Date(this.firstDay.setDate(this.firstDay.getDate())))
      this.firstDay.setDate(this.firstDay.getDate() + 1);
    }
  }
}
