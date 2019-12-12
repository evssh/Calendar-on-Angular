import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

 @Input() day

  constructor() { }

  ngOnInit() {
  }

}
