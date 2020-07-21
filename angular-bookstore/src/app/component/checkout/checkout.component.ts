import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0; 
  totalItems: number = 0;
  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _cartService: CartService,
    private _checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {

    this.cartDetails();
    this.fillMonthsAndYears();

    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']

      }),
      billingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']

      }),
      creditCard: this._formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        cvv: [''],
        expirationMonth: [''],
        expirationYear: ['']

      })
    })
  }

  onSubmit(){
    console.log('purchase book');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value);
    }else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  cartDetails(){
    this.cartItems = this._cartService.cartItem;
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this._cartService.totalQuantity.subscribe(
      data => this.totalItems = data
    );

    this._cartService.calculateTotalPrice();
  }

  fillMonthsAndYears(){
    const startMonth: number = new Date().getMonth() + 1;
    this._checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
    this._checkoutService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );
  }

}
