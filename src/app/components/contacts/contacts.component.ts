import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/shared/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { canComponentLeave } from 'src/app/guards/unsaved-changes.guard';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit,canComponentLeave {

  canLeave(){
    if(this.contactForm.dirty)
    {
   confirm('r u want to leave the page')
    }
    return true
  }
  error: { [k: string]: any } = {};

  phoneNum = '1234567888';
  constructor(
    public fb: FormBuilder,
    public api: LoginServiceService,
    private toaster: ToastrService
  ) {}
  contactForm!: FormGroup;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      vechilePricing: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      }),
      digitalStrategy: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      }),
    });

    this.api.getContacts().subscribe((res) => {
      res.forEach((e: any) => {
        console.log(e);
        this.contactForm.value.firstName = e.firstName;
        this.contactForm.value.lasName = e.lastName;
        this.contactForm.value.email = e.email;
        this.contactForm.value.phoneNumber = e.phoneNumber;
        this.contactForm.value.vechilePricing.firstName =
          e.vechilePricing.firstName;
        this.contactForm.value.vechilePricing.lastName =
          e.vechilePricing.lastName;
        this.contactForm.value.vechilePricing.email = e.vechilePricing.email;
        this.contactForm.value.vechilePricing.phoneNumber =
          e.vechilePricing.phoneNumber;
        this.contactForm.value.digitalStrategy.firstName =
          e.digitalStrategy.firstName;
        this.contactForm.value.digitalStrategy.lastName =
          e.digitalStrategy.lastName;
        this.contactForm.value.digitalStrategy.email = e.digitalStrategy.email;
        this.contactForm.value.digitalStrategy.phoneNumber =
          e.digitalStrategy.phoneNumber;
        // console.log(this.contactForm.value.vechilePricing.firstName)
      });

      this.contactForm.patchValue({
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lasName,
        email: this.contactForm.value.email,
        phoneNumber: this.contactForm.value.phoneNumber,
        vechilePricing: {
          firstName: this.contactForm.value.vechilePricing.firstName,
          lastName: this.contactForm.value.vechilePricing.lastName,
          email: this.contactForm.value.vechilePricing.email,
          phoneNumber: this.contactForm.value.vechilePricing.phoneNumber,
        },
        digitalStrategy: {
          firstName: this.contactForm.value.digitalStrategy.firstName,
          lastName: this.contactForm.value.digitalStrategy.lastName,
          email: this.contactForm.value.digitalStrategy.email,
          phoneNumber: this.contactForm.value.digitalStrategy.phoneNumber,
        },
      });
    });
  }
  contactSubmit() {
    console.log(this.contactForm);
    this.api.postContacts(this.contactForm.value).subscribe((e) => {});
    this.toaster.success('sucuess', 'info');

    this.contactForm.reset();
  }

  get lastName() {
    return this.contactForm.get('lastName');
  }
  get firstName() {
    return this.contactForm.get('firstName');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get lastName2() {
    return this.contactForm.get(['digitalStrategy', 'lastName']);
  }
  get firstName2() {
    return this.contactForm.get(['digitalStrategy', 'firstName']);
  }
  get email2() {
    return this.contactForm.get(['digitalStrategy', 'email']);
  }
  get phoneNumber2() {
    return this.contactForm.get(['digitalStrategy', 'phoneNumber']);
  }
  get lastName1() {
    return this.contactForm.get(['vechilePricing', 'lastName']);
  }
  get firstName1() {
    return this.contactForm.get(['vechilePricing', 'firstName']);
  }
  get email1() {
    return this.contactForm.get(['vechilePricing', 'email']);
  }
  get phoneNumber1() {
    return this.contactForm.get(['vechilePricing', 'phoneNumber']);
  }

  valid(e: any, type: any) {
    let phone = e.target.value;

    if ('email' == e.target.name) {
      let pattren = /[a-z]+@gmail\.com/;
      let email = e.target.value;
      if (pattren.test(email)) {
        this.error['is' + type + 'Error'] = false;
      } else {
        this.error['is' + type + 'Error'] = true;
      }
    } else if ('phonenum' == e.target.name) {
      console.log('password');
      if (phone.length < 12) {
        this.error['is' + type + 'Error'] = true;
      } else {
        this.error['is' + type + 'Error'] = false;
      }
    }
  }
}
