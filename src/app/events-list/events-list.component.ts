import {Component, Input, OnInit} from '@angular/core';
import {EventMy} from "../app.component";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input() event: EventMy

  constructor() { }

  ngOnInit() {
  }

}
