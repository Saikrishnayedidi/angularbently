import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleServiceService {
 private _toggleEvent=new Subject<boolean>();
  toggleMessage=this._toggleEvent.asObservable()
private _parentData=new BehaviorSubject<number>(0)  
private _adsEnhansment=new BehaviorSubject<number>(0)
private _video=new BehaviorSubject<number>(0)
private _parentAdsdata=new BehaviorSubject<number>(0)
private _serviceData=new BehaviorSubject<number>(0)
private _retention=new BehaviorSubject<number>(0)
private _degital=new BehaviorSubject<number>(0)
private _social=new BehaviorSubject<number>(0)
social=this._social.asObservable()
degital=this._degital.asObservable()
retention=this._retention.asObservable()
serviceData=this._serviceData.asObservable()
parentDara=this._parentData.asObservable()
adsdata=this._adsEnhansment.asObservable()
videoData=this._video.asObservable()
adsParentData=this._parentAdsdata.asObservable()
  constructor() { }

  toggle(msg:boolean){
   this._toggleEvent.next(msg)
  }
  getParetData(input:number){
   this._parentData.next(input)
  }


  getAdsData(input:number){
    this._adsEnhansment.next(input)
  }

  getVideoData(input:number){
    this._video.next(input)
  }


  getParentAdsData(input:number){
    this._parentAdsdata.next(input)
  }

  getService(input:number){
this._serviceData.next(input)
  }

  getRetencation(input:number){
    this._retention.next(input)
  }
  getDigital(input:number){
    this._degital.next(input)
  }

  getSocial(input:number){
    this._social.next(input)
  }
}
