import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ModalPubSubService {
  public dynamicComponent$: Subject<string> = new Subject<string>()
  constructor() {
  }

  showDialogModal(vehicleId: string){
    this.dynamicComponent$.next(vehicleId);
  }
}
