import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { BookService } from './services/book.service';
import { BookCategoryComponent } from './component/book-category/book-category.component';
import { SearchComponent } from './component/search/search.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'checkout', component: CheckoutComponent},
  {path:'cart-details', component: CartDetailsComponent},
  {path:'books', component: BookListComponent},
  {path:'books/:id', component: BookDetailsComponent},
  {path:'search/:keyword', component: BookListComponent},
  {path:'category/:id', component: BookListComponent},
  {path:'', redirectTo: '/books' , pathMatch:'full'},
  {path:'**' , component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwPaginationModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
