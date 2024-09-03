import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Author } from './authors.model';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  // author subject
  private _authorSubject = new BehaviorSubject<Author[]>([]);
  // public authors$ = this._authorSubject.asObservable();
  private http = inject(HttpClient);
  private apiUrl = `${enviroment.apiUrl}/authors`
  constructor() {
    // logic untuk menambahkan author subject []
    // this.loadAuthors();
  }

  // private loadAuthors(){
  //   this.http.get<Author[]>(this.apiUrl)
  //   .pipe(
  //     tap((authors) => this._authorSubject.next(authors)),
  //     catchError((response) => {
  //       console.log(response);
  //       return throwError(()=> new Error("Gagal Mengambil data"))
  //     })
  //   )
  //   .subscribe()
  // }

  getAllAuthors():Observable<Author[]>{
    return this.http.get<Author[]>(this.apiUrl)
    .pipe(
      tap((authors) => this._authorSubject.next(authors)),
      catchError((response) => {
        console.log(response);
        return throwError(()=> new Error("Gagal Mengambil data"))
      })
    );
  }

  newAuthor(authorFormData: {name:string}){
    // mengambil api post
    return this.http.post<Author>(this.apiUrl,authorFormData)
    .pipe(
      tap((author) => this._authorSubject.next([...this._authorSubject.getValue(), author]))
    );
  }

  deleteAuthorById(id:number): Observable<Author>{
    return this.http.delete<Author>(`${this.apiUrl}/${id}`)
    .pipe(
      tap((author)=> {
        const index = this._authorSubject.getValue().findIndex((a) => a.id === id);
        this._authorSubject.getValue().splice(index, 1);
        // const allAuthors = this._authorSubject.getValue();
        // const newAuthors = allAuthors.splice(id, 1);
        // this._authorSubject.next(newAuthors)
        // this._authorSubject.next(this._authorSubject.getValue().filter(author => author.id !== id))
      }),
      catchError((response) => {
        console.log(response);
        return throwError(()=> new Error("Gagal Menghapus Data"))
      })
    )
  }

  getAuthorById(id:number):Observable<Author>{
    return this.http.get<Author>(`${this.apiUrl}/${id}`)
    // .pipe(
    //   catchError(() => {
    //     return throwError(() => new Error("Gagal Mengambil data dengan Id" + id ))
    // })
    // )
  }

  updateAuthor(id:number, author:Author){
    return this.http.put(`${this.apiUrl}/${id}`, author)
    .pipe(
      tap(()=> this._authorSubject.next(this._authorSubject.getValue().map(a => a.id === id? author: a))),
      catchError(res => throwError(() => new Error("Gagal Update", res)))
    )
  }
}
