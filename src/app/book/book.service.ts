import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../app.config';
import { Response } from '../response.model';
import { formatDate } from '@angular/common';
import { Params } from './params.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _bookSubject = new BehaviorSubject<Book[]>([]);
  private http = inject(HttpClient);
  private apiBookAdmin = `${enviroment.apiUrl}/Books`;
  constructor() { }
  // params$ = new  BehaviorSubject<Params>({
  //   pageNumber : 1,
  //   pageSi: 5,
  //   name: '',
  //   authorName: ''
  // })

  getAllBooks(params:{pageNumber:number, pageSize:number, name:string, authorName:string}):Observable<Response>{
    return this.http.get<Response>(this.apiBookAdmin, {params})
      .pipe(
        tap((books) => this._bookSubject.next(books.data)),
        catchError(() => {
          return throwError(() => new Error("Failed Load Book Data"))
        })
      );
  }

  addNewBook(bookFormData: {name:string, cover:any, releaseDate:string, authorId:number}){
    const body = new FormData();
    body.append('name', bookFormData.name);
    body.append('cover', bookFormData.cover);
    body.append('releaseDate', bookFormData.releaseDate);
    body.append('authorId', bookFormData.authorId.toString())
    return this.http.post<Book>(this.apiBookAdmin, body)
    .pipe(
      tap((book) => this._bookSubject.next([...this._bookSubject.getValue(), book]))
    );
  }

  deleteBookById(id:number):Observable<Book>{
    return this.http.delete<Book>(`${this.apiBookAdmin}/${id}`)
    .pipe(
      tap(() => {
        const index = this._bookSubject.getValue().findIndex((b) => b.id === id);
        this._bookSubject.getValue().splice(index, 1);
      }),
      catchError((response) => {
        console.log(response);
        return throwError(() => new Error("Deleted Failed"))
      })
    )
  }

  getBookById(id:number):Observable<Book>{
    return this.http.get<Book>(`${this.apiBookAdmin}/${id}`)
  }

  updateBook(bookFormData : {id:number, name:string, cover:any, releaseDate:string, authorId:number}){
    const body= new FormData();
    body.append('id', bookFormData.id.toString());
    body.append('name', bookFormData.name);
    body.append('cover', bookFormData.cover);
    body.append('releaseDate', bookFormData.releaseDate);
    body.append('authorId', bookFormData.authorId.toString());
    return this.http.put<Book>(`${this.apiBookAdmin}/${bookFormData.id}`, body);
  }

}
