import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { MovieService } from '../services/movie.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any;
  customers: any;
  movies: any;

  selectedMovie: string;
  selectedCustomer: string;

  constructor(private orderService: OrderService, private movieService: MovieService, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  getCustomers() {
    this.customerService.getCustomers()
    .subscribe((data) => {
      this.customers = data;
    });
  }
  getBooks() {
    this.movieService.getMovies()
    .subscribe((data) => {
      let arraydata = [];
      var filteredData = [];

      for (let key in data){
        arraydata.push(data[key])
      }
      for (let movie of arraydata){
        if(!movie.status){
          filteredData.push(movie);
        }
      }
      this.movies = filteredData;
    });
  }

  makeOrder(){
    let data = {
      "movieName": this.selectedMovie,
      "ClientName": this.selectedCustomer
    }
    this.orderService.makeOrder(data)
    .subscribe((data) => {
      location.reload();
    });
  }

  getOrders() {
    this.orderService.getOrders()
    .subscribe((data) => {
      this.orders = data;
    });
  }

}
