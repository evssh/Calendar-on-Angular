import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  firstDay: Date
  tempArr: Array<any>
  theMonth: number
  monthView: Date
  today = new Date()

  constructor() { }
  ngOnInit() {
    this.refresh()
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
      this.tempArr.push(this.firstDay.getDate())
      this.firstDay.setDate(this.firstDay.getDate() + 1);
    }
  }
}
