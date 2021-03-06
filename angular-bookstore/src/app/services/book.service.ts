import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";
  
  constructor(private httpClient: HttpClient) { }

  getBooks(categoryId: number, currentPage: number, pageSize: number):Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  private getBookLists(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books));
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number):Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/search-keyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  getBookCatgories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategories));
  }

  getBookById(bookId: number):Observable<Book>{
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }

}

interface GetResponseBooks{
  _embedded:{ 
    books:Book[];
  },
  page:{
    //number of records in each page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, start from 0 index
    totalPages: number,
    //current page
    number: number;
  }
}

interface GetResponseBookCategory{
  _embedded:{
    bookCategories:BookCategory[];
  }
}