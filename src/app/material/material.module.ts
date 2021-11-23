import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const materials=[
  MatButtonModule,
  MatExpansionModule,
  MatSlideToggleModule
  

]

@NgModule({
  declarations: [],
  imports: [
    materials
  ],
  exports:[materials]
})
export class MaterialModule { }




