import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-popup-add-event',
  templateUrl: './popup-add-event.component.html',
  styleUrls: ['./popup-add-event.component.scss']
})
export class PopupAddEventComponent implements OnInit {

  constructor( public dialogbox: MatDialogRef<PopupAddEventComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogbox.close();
  }

}
