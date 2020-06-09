import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SplitService {
  public dynamicComponent$: Subject<string> = new Subject<string>()
  constructor() {
  }

  updateMap(){
    this.dynamicComponent$.next('');
  }
}
