import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    //check whether book/item is already in cart
    let alreadyExistingCart: boolean = false;
    let existingCartItem: CartItem = undefined;


    if(this.cartItem.length > 0){
      existingCartItem = this.cartItem.find(tempCartItem => tempCartItem.id ===theCartItem.id);
      
      alreadyExistingCart = (existingCartItem != undefined)
    }
    if(alreadyExistingCart){
      existingCartItem.quantity++;
    }else{
      this.cartItem.push(theCartItem);
    }
    this.calculateTotalPrice();

  }
  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    //calculate the total price and total quantity
    for(let currentCartItem of this.cartItem){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    console.log(`total price: ${totalPriceValue} , total quantity: ${totalQuantityValue}`);

    //publish the events

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
