import {Injectable} from "@angular/core";
import {Events} from "../models/Events";


@Injectable({providedIn: 'root'})
export class EventsService {
  private _events:Events[] = [];

  constructor() {
  }

  addEvent(event: Events){
    this._events.push(event);
  }

  public get events() {
    return this._events;
  }
  public get eventsNew() {
    return this._events.filter(x=>x.readed == false);
  }

  readedAll(){
    for (let event of this._events){
      event.readed = true;
    }
  }

  clear(){
    this._events = [];
  }
}
