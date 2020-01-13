import { Pipe, PipeTransform } from '@angular/core';
import {EventMy} from "../app.component";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(events: EventMy[], search: string = '', field: string = 'title'): EventMy[] {
    if (!search.trim()) {
      return events;
    }
    return events.filter(event => {
      return event[field].toLowerCase().includes(search.toLowerCase());
    })
  }

}
