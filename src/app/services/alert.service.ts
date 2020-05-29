import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType,
  title:string;
  img:string;
  text:string
}

@Injectable()
export class AlertService{
  public $alert = new Subject<Alert>();

  success(title:string, text:string, img:string){
    this.$alert.next({type:"success", title, img, text});
  }

  warning(title:string, text:string, img:string){
    this.$alert.next({type:"warning", title, img, text});
  }

  danger(title:string, text:string, img:string){
    this.$alert.next({type:"danger", title, img, text});
  }
}
