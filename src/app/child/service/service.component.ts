import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { canComponentLeave } from 'src/app/guards/unsaved-changes.guard';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit, DoCheck, canComponentLeave {
  constructor(public fb: FormBuilder, public _toggle: ToggleServiceService) {}

  ngOnInit(): void {}
  canLeave() {
    if (this.serviceForm.dirty) {
      return window.confirm('you have some unsaved data');
    }
    return true;
  }
  serviceForm = this.fb.group({
    seriveCustom: this.fb.group({
      monthlyFee: [''],
    }),
    service: this.fb.group({
      monthlyFee: [''],
    }),
    search: this.fb.group({
      monthlyBudgetSearch: [''],
      monthlyBudgetService: [''],
    }),
    search2: this.fb.group({
      monthlyBudgetSearch: [''],
      monthlyBudgetService: [''],
    }),
  });
  display: { [x: string]: any } = {};
  servieFun(
    e: any,
    formGroupName: string,
    formControlName: string,
    lineAmount: string,
    lineAmountTotal: string
  ) {
    this.display[lineAmount] = parseFloat(e.target.value);

    if (e.target.value.length > 0) {
      if (e.target.value.includes('$')) {
        this.serviceForm.patchValue({
          [formGroupName]: {
            [formControlName]: e.target.value,
          },
        });
      } else {
        this.serviceForm.patchValue({
          [formGroupName]: {
            [formControlName]: '$' + e.target.value,
          },
        });
      }
    }

    if ('sub' == e.target.dataset.name) {
      this.display.lineAmountTotal1 =
        (this.display.lineAmount || 0) +
        (this.display.lineAmount1 || 0) +
        (this.display.lineAmount2 || 0);
    }
    if ('Sub' == e.target.dataset.name) {
      this.display.lineAmountTotal2 =
        (this.display.lineAmount3 || 0) +
        (this.display.lineAmount4 || 0) +
        (this.display.lineAmount5 || 0);
    }
  }
  input!: any;
  input2!: any;
  @ViewChild('#input1') input1!: ElementRef;
  check(e: any) {
    this.input = this.serviceForm.value.seriveCustom.monthlyFee;
    this.input2 = this.serviceForm.value.service.monthlyFee;
    if ('defaultCheck1' == e.target.id) {
      if (e.target.checked) {
        this.display.lineAmount = this.remove(this.input);
        this.display.lineAmountTotal1 =
          (this.display.lineAmount || 0) +
          (this.display.lineAmount1 || 0) +
          (this.display.lineAmount2 || 0);
      } else {
        this.display.lineAmount = 0;
        this.display.lineAmount1 = 0;
        this.display.lineAmount2 = 0;

        this.display.lineAmountTotal1 =
          (this.display.lineAmount || 0) +
          (this.display.lineAmount1 || 0) +
          (this.display.lineAmount2 || 0);

        this.serviceForm.patchValue({
          search: {
            monthlyBudgetSearch: '',
            monthlyBudgetService: '',
          },
        });
      }

      // this.line.nativeElement.innerText=0
    }
    if ('defaultCheck2' == e.target.id) {
      if (e.target.checked) {
        this.display.lineAmount3 = this.remove(this.input2);
        this.display.lineAmountTotal2 =
          (this.display.lineAmount3 || 0) +
          (this.display.lineAmount4 || 0) +
          (this.display.lineAmount5 || 0);
      } else {
        this.display.lineAmount3 = 0;
        this.display.lineAmount4 = 0;
        this.display.lineAmount5 = 0;

        this.display.lineAmountTotal2 =
          (this.display.lineAmount3 || 0) +
          (this.display.lineAmount4 || 0) +
          (this.display.lineAmount5 || 0);

        this.serviceForm.patchValue({
          search2: {
            monthlyBudgetSearch: '',
            monthlyBudgetService: '',
          },
        });
      }

      // this.line.nativeElement.innerText=0
    }
  }
  servicetotal!: any;
  ngDoCheck() {
    this.servicetotal =
      (this.display.lineAmountTotal2 || 0) +
      (this.display.lineAmountTotal1 || 0);
    this._toggle.getService(this.servicetotal);
  }

  remove(data: any) {
    let m = data.substring(1, data.length);
    let s = parseFloat(m);
    return s;
  }
}
