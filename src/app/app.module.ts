import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { DayComponent } from './day/day.component';
import {FormsModule} from '@angular/forms';
import { AddEventComponent } from './add-event/add-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupAddEventComponent } from './popup-add-event/popup-add-event.component';
import {MatButtonModule, MatDialogModule, MatIconModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    DayComponent,
    AddEventComponent,
    PopupAddEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[PopupAddEventComponent]
})
export class AppModule { }
