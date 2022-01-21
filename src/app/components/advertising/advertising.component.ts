import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { canComponentLeave } from 'src/app/guards/unsaved-changes.guard';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
})
export class AdvertisingComponent {}
