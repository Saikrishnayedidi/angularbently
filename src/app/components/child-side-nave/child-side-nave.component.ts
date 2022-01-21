import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/shared/login-service.service';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';

@Component({
  selector: 'app-child-side-nave',
  templateUrl: './child-side-nave.component.html',
  styleUrls: ['./child-side-nave.component.scss']
})
export class ChildSideNaveComponent implements OnInit,DoCheck {
 isValid=false
  constructor(private _toggleServ:ToggleServiceService,public fb:FormBuilder,public _login:LoginServiceService) { }
   @Input('Retention') Retention!:number
ads!:number
  //  dollerRetention:string="$"+(this.Retention||0)
data!:number
retenction!:number
totalBudget!:number
totalDegital!:number
totalSocial!:number
modelForm!:FormGroup
  ngOnInit(): void {
    this._toggleServ.toggleMessage.subscribe((res)=>{
      this.isValid=!res
      this.totalsum()
    })

    this._toggleServ.parentDara.subscribe((res)=>{
     
      this.data=res
      this.totalsum()
    })

    this._toggleServ.adsParentData.subscribe((res)=>{
     
      this.ads= res
      this.totalsum()
    
    })

    this._toggleServ.retention.subscribe((res)=>{
      this.retenction=res
      this.totalsum()
    })
    this._toggleServ.degital.subscribe((res)=>{
      this.totalDegital=res
      this.totalsum()
    })
    this._toggleServ.social.subscribe((res)=>{
this.totalSocial=res
this.totalsum()
    })

    this.modelForm=this.fb.group({
      team:[''],
      region:[''],
      customer:[''],
      vpCustomer:[''],
      territory:[''],
      vpTerritory:[''],
      regionalSales:[''],
      vpSales:[''],
      customerSuccess:['']
    })
    this._login.getModel().subscribe((res)=>{
      res.forEach((data:any) => {
        this.modelForm.value.team=data.team
        this.modelForm.value.region=data.region
        this.modelForm.value.customer=data.customer
        this.modelForm.value.vpCustomer=data.vpCustomer
        this.modelForm.value.territory=data.territory
        this.modelForm.value.vpTerritory=data.vpTerritory
        this.modelForm.value.regionalSales=data.regionalSales
        this.modelForm.value.vpSales=data.vpSales
        this.modelForm.value.customerSuccess=data.customerSuccess





      });
      this.modelForm.patchValue({
        team:this.modelForm.value.team,
        region:this.modelForm.value.region,
        customer: this.modelForm.value.customer,
        vpCustomer: this.modelForm.value.vpCustomer,
        territory:this.modelForm.value.territory,
        vpTerritory:this.modelForm.value.vpTerritory,
        regionalSales: this.modelForm.value.regionalSales,
        vpSales: this.modelForm.value.vpSales,
        customerSuccess: this.modelForm.value.customerSuccess,
       
      })
    })
    
   
  }
  totalsum(){
    this.totalBudget=(this.data||0)+(this.ads||0)+(this.retenction||0)+(this.totalDegital||0)+(this.totalSocial||0)
  }
  ngDoCheck(){
   
  }

  choose=[
    
    {
      select:'Bravo'
    },
    {
      select:'Eco'

    },{
      select:'Alpha'
    },
    {
      select:'Delta'
    },

  ];

  region=[{
    select:'West'
  },{
    select:'Bently'
  },
{
  select:'central'
},
{select:'national'},
{
  select:'Noreth east'
}
]
customer=[
  {
    select:'Amanda Mire'
  },
  {
    select:'saikrishna'
  },
  {
    select:'sai'
  },
  {
    select:'krishna'
  },
  {
    select :'Bobby'
  }
]
vpCustomer=[
  {
    select:'Amanda Mire'
  },
  {
    select:'saikrishna'
  },
  {
    select:'sai'
  },
  {
    select:'krishna'
  },
  {
    select :'Bobby'
  }]

  territory=[
    {
      select:'Amanda Mire'
    },
    {
      select:'saikrishna'
    },
    {
      select:'sai'
    },
    {
      select:'krishna'
    },
    {
      select :'Bobby'
    }]
  vpTerritory=[
    {
      select:'Amanda Mire'
    },
    {
      select:'saikrishna'
    },
    {
      select:'sai'
    },
    {
      select:'krishna'
    },
    {
      select :'Bobby'
    }]
  regionalSales=[
    {
      select:'Amanda Mire'
    },
    {
      select:'saikrishna'
    },
    {
      select:'sai'
    },
    {
      select:'krishna'
    },
    {
      select :'Bobby'
    }]
  vpSales=[
    {
      select:'Amanda Mire'
    },
    {
      select:'saikrishna'
    },
    {
      select:'sai'
    },
    {
      select:'krishna'
    },
    {
      select :'Bobby'
    }]
  customerSuccess=[
    {
      select:'Amanda Mire'
    },
    {
      select:'saikrishna'
    },
    {
      select:'sai'
    },
    {
      select:'krishna'
    },
    {
      select :'Bobby'
    }]
  modelSubmit(){
this._login.postModel(this.modelForm.value).subscribe((res)=>{

})
  }

  
}
