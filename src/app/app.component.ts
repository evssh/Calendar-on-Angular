import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectDay: Date

  chooseDate(date) {
    this.selectDay = new Date(date)
    console.log('select: ', this.selectDay)
  }
}
