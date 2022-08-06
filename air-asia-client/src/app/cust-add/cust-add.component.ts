import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
@Component({
  selector: 'app-cust-add',
  templateUrl: './cust-add.component.html',
  styleUrls: ['./cust-add.component.scss']
})
export class CustAddComponent implements OnInit {
  customerFormGroup: FormGroup;
  customers: any[] = []
  constructor(private _formBuilder: FormBuilder, private accountService: AccountService) {
    // cookieService.set('laravel_session', 'value')
    // console.log('laravel_session', cookieService.getAll())

  }

  ngOnInit(): void {
    this.customerFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      points: ['', Validators.required],
      accountType: ['', Validators.required],
      customerName: ['', Validators.required]
    });    
    this.getCustomers()
  }

  clickedAddCustomer(): void {
    console.log(this.customerFormGroup.value);
    this.accountService.add(this.customerFormGroup.value).subscribe((data: any) => {
      console.log("data", data);
      this.getCustomers()
    })   

  }

  getCustomers(): void {
    this.accountService.getAll().subscribe((data: any) => {
      console.log("customers", data);
      this.customers = []
      data.forEach((customer) => {
        this.customers.unshift(customer)
      });
      
    })   
  }


}
