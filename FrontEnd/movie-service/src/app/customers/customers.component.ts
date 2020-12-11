import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any;
  dummyCustomers: Customer[] = [
    {
      id: 1,
      name: 'mona',
      email: 'gayel ab',
      location: 'beirut',
      movies: ['1', '2', '3']
    },
    {
      id: 2,
      name: 'mo22na',
      email: 'gayel ab',
      location: 'beirut',
      movies: []
    }
  ];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }


  addNewCustomer(name: string, email: string, location: string): void {
    const customer: Customer = {
      name: String(name),
      email: String(email),
      location: String(location),
      movies: []
    };
    this.customerService.addCustomer(customer).subscribe(() => { }, (error) => console.log(error), () => {
      console.log('Data Insert');
      window.location.reload();
    });
  }


  getCustomers() {
    this.customerService.getCustomers()
    .subscribe((data) => {
      this.customers = data;
    });
  }

}
