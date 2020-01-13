import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { DayComponent } from './day/day.component';
import {FormsModule} from '@angular/forms';
import { AddEventComponent } from './add-event/add-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsListComponent } from './events-list/events-list.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    DayComponent,
    AddEventComponent,
    EventsListComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
