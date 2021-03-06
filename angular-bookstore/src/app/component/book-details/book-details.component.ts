import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _bookService: BookService,
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }
  getBookInfo(){
    
    const id: number =  +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookService.getBookById(id).subscribe(
      data => {
        this.book = data;
      }
    )

  }

  addToCart(book: Book){
    console.log(`Book Name: ${book.name} and Price : ${book.unitPrice}`);
    const cartItem  = new CartItem(book);
    this._cartService.addToCart(cartItem);
    
  }

}
