import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { BookItemComponent } from './book-item/book-item.component';
import { RouterLink } from '@angular/router';
import { Response } from '../../response.model';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookItemComponent, RouterLink, NgFor, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books!:Book[];
  pagination!: Response;
  totalItem: number = 0;
  totalpage: number = 0;
  params = new FormGroup({
    pageNumber: new FormControl(1),
    pageSize: new FormControl(5),
    name: new FormControl(''),
    authorName: new FormControl('')
  });
  // totalRecord!: number;
  // pagesize!:number;
  erroMessage?:string;
  destroyRef = inject(DestroyRef);
  constructor(private bookService:BookService){};
  ngOnInit(): void {
    this.params.valueChanges.subscribe(() => this.getAllBook())
    this.getAllBook()

    // this.destroyRef.onDestroy(() => subcription.unsubscribe);
  }

  getAllBook(){
    let param = this.params.value as {pageNumber:number, pageSize:number, name:string, authorName:string};
    this.bookService.getAllBooks(param).subscribe({
      next: (response) => {
        this.books = response.data;
        this.totalItem = response.totalRecords;
        this.totalpage = response.totalPages
      },
      error: (err) => {
        this.erroMessage = err.errorMessage
      }
    });
  }

  onMovePage(page:number){
    this.params.patchValue({pageNumber: page})
    console.log(page);
    this.getAllBook();
  }
}
