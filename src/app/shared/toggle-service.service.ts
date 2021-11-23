import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleServiceService {
 private _toggleEvent=new Subject<boolean>();
  toggleMessage=this._toggleEvent.asObservable()
private _parentData=new BehaviorSubject<number>(0)  
parentDara=this._parentData.asObservable()
  constructor() { }

  toggle(msg:boolean){
   this._toggleEvent.next(msg)
  }
  getParetData(input:number){
   this._parentData.next(input)
  }
}
