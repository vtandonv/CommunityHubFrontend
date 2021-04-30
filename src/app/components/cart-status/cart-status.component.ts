import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updataCartStatus();
  }
  updataCartStatus() {
    

    // subscribe to the cart totalPice (1st event)
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );    

    // subscribe to the cart totalQuantity (2nd event)
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
