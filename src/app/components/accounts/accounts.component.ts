import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  select = 'select';
  conform = [
    {
      select: 'yes',
    },
    {
      select: 'no',
    },
  ];
  data: any;

  error: { [k: string]: any } = {};

  // isUrlError: boolean = false;

  constructor(
    public fb: FormBuilder,
    public api: LoginServiceService,
    public http: HttpClient
  ) {}
  accountForm!: FormGroup;
  ngOnInit(): void {
    this.accountForm = this.fb.group({
      conform: [''],
      URLS: this.fb.group({
        websiteURLS: ['', [Validators.required, Validators.minLength(6)]],
        websiteProvider: ['', [Validators.required, Validators.minLength(6)]],
        facebookURL: ['', [Validators.required, Validators.minLength(6)]],
        twitterURL: ['', [Validators.required, Validators.minLength(6)]],
        instagramURL: ['', [Validators.required, Validators.minLength(6)]],
        youTubeURL: ['', [Validators.required, Validators.minLength(6)]],

        callLineSales: ['', [Validators.minLength(9)]],
        callLineService: ['', [Validators.required, Validators.minLength(9)]],
      }),
    });

    this.api.getAccounts().subscribe((res) => {
      res.forEach((data: any) => {
        this.accountForm.value.conform = data.conform;
        this.accountForm.value.URLS.websiteURLS = data.URLS.websiteURLS;
        this.accountForm.value.URLS.websiteProvider = data.URLS.websiteProvider;
        this.accountForm.value.URLS.facebookURL = data.URLS.facebookURL;
        this.accountForm.value.URLS.twitterURL = data.URLS.twitterURL;
        this.accountForm.value.URLS.instagramURL = data.URLS.instagramURL;
        this.accountForm.value.URLS.youTubeURL = data.URLS.youTubeURL;
        this.accountForm.value.URLS.callLineSales = data.URLS.callLineSales;
        this.accountForm.value.URLS.callLineService = data.URLS.callLineService;
      });

      this.accountForm.patchValue({
        conform: this.accountForm.value.conform,
        URLS: {
          websiteURLS: this.accountForm.value.URLS.websiteURLS,
          websiteProvider: this.accountForm.value.URLS.websiteProvider,
          facebookURL: this.accountForm.value.URLS.facebookURL,
          twitterURL: this.accountForm.value.URLS.twitterURL,
          instagramURL: this.accountForm.value.URLS.instagramURL,
          youTubeURL: this.accountForm.value.URLS.youTubeURl,
          callLineSales: this.accountForm.value.URLS.callLineSales,
          callLineService: this.accountForm.value.URLS.callLineService,
        },
      });
    });
  }

  accountSubmit() {
    this.api.postAccounts(this.accountForm.value).subscribe((result) => {
      console.log(result);
    });
  }
  urlVlid(e: Event, item: any) {
    let url = (e.target as HTMLInputElement).value;
    let pattren = /^[w]{3}\.[a-z0-9]+\.com$/;

    if (url) {
      if (pattren.test(url)) {
        this.error['is' + item + 'Error'] = false;
      } else {
        if (url.length < 6) {
          this.error['is' + item + 'Error'] = true;
        } else {
          this.error['is' + item + 'Error'] = false;
        }
      }
    } else {
      this.error['is' + item + 'Error'] = false;
    }
  }
}
