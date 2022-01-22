import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, DoCheck {
  constructor(public fb: FormBuilder, public _toggle: ToggleServiceService) {}

  ngOnInit(): void {}

  videoForm = this.fb.group({
    vAdvidPackage: this.fb.group({
      vMonthlyFree: [''],
    }),
    vAdvidNew: this.fb.group({
      vPercentage: [''],
      vMonthlyBudget: [''],
    }),
    vAdvidPreOwned: this.fb.group({
      vPercentage: [''],
      vMonthlyBudget: [''],
    }),
  });
  display: { [x: string]: any } = {};
  vLineAmount!: number;
  // vLineAmount1!:number
  // vPercentagefee!:number
  // vPercentage!:number
  // vMonthlyBudget!:number
  isAllowed = true;
  ngDoCheck() {
    this.videoTotal =
      (this.vLineAmount || 0) +
      (parseFloat(this.display.vLineAmount1) || 0) +
      (parseFloat(this.display.vLineAmount2) || 0);
    this._toggle.getVideoData(this.videoTotal);
  }
  videoTotal!: number;
  videoPercentage(
    e: any,
    formGroupName: string,
    formControlName: string,
    formControlName1: string,
    percentageFee: string,
    lineAmount: string,
    percentage: string,
    monthlyBudget: string
  ) {
    if ('parent' == e.target.dataset.name) {
      this.vLineAmount = parseFloat(e.target.value);
    }

    if ('vPercentage' == e.target.dataset.name) {
      this.display[percentage] = parseFloat(e.target.value) / 100;
    }
    if ('vMonthlyBudget' == e.target.dataset.name) {
      this.display[monthlyBudget] = parseInt(e.target.value);
    }

    this.display[percentageFee] =
      this.display[percentage] * this.display[monthlyBudget];
    let data = this.display[percentageFee] + this.display[monthlyBudget];
    this.display[lineAmount] = parseFloat(data);
    if (
      e.target.value.length > 0 &&
      !(e.target.value.includes('%') || e.target.value.includes('$'))
    ) {
      this.videoForm.patchValue({
        [formGroupName]: {
          [formControlName]: '$' + e.target.value + '.00',
          [formControlName1]: e.target.value + '%',
        },
      });
    }
  }

  videoCheck(e: any) {
    if (e.target.checked) {
      this.isAllowed = true;
      this.videoForm.get(['vAdvidPackage', 'vMonthlyFree'])?.enable();
      let data = this.videoForm.value.vAdvidPackage.vMonthlyFree;
      let m = data.substring(1, data.length);
      let s = parseFloat(m);
      this.vLineAmount = s;
    } else {
      this.isAllowed = false;
      this.videoForm.get(['vAdvidPackage', 'vMonthlyFree'])?.disable();
      this.vLineAmount = 0;
      this.display.vLineAmount1 = null;
      this.display.vLineAmount2 = null;
      this.display.vPercentagefee = null;
      this.display.vPercentagefee1 = null;
      this.videoForm.get(['vAdvidNew', 'vPercentage'])?.reset();
      this.videoForm.get(['vAdvidNew', 'vMonthlyBudget'])?.reset();
      this.videoForm.get(['vAdvidPreOwned', 'vPercentage'])?.reset();
      this.videoForm.get(['vAdvidPreOwned', 'vMonthlyBudget'])?.reset();
    }
  }
}
