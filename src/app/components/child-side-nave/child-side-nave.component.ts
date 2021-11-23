import { Component, OnInit } from '@angular/core';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';

@Component({
  selector: 'app-child-side-nave',
  templateUrl: './child-side-nave.component.html',
  styleUrls: ['./child-side-nave.component.scss']
})
export class ChildSideNaveComponent implements OnInit {
 isValid=false
  constructor(private _toggleServ:ToggleServiceService) { }
data!:string
  ngOnInit(): void {
    this._toggleServ.toggleMessage.subscribe((res)=>{
      this.isValid=!res
    })

    this._toggleServ.parentDara.subscribe((res)=>{
      let dollor="$" + res
      this.data=dollor
    })
  }
  
}
