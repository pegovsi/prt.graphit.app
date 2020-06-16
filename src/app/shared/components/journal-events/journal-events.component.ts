import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../services/events.service";
import {Events} from "../../../models/Events";

@Component({
  selector: 'app-journal-events',
  templateUrl: './journal-events.component.html',
  styleUrls: ['./journal-events.component.scss']
})
export class JournalEventsComponent implements OnInit {

  events:Events[] = [];

  constructor(private eventService:EventsService) {

  }

  ngOnInit(): void {

    this.events = this.eventService.events;
    this.eventService.readedAll();

    console.log(this.events);
  }

  getDate(date:number){
    return new Date(date);
  }

}
