import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../book.model';
import { DatePipe } from '@angular/common';
import { AuthorService } from '../../../authors/author.service';
import { Author } from '../../../authors/authors.model';
import { BookService } from '../../book.service';
import { enviroment } from '../../../app.config';

@Component({
  selector: 'tr[app-book-item]',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent implements OnInit {
  @Input({required:true}) book!: Book;
  // authorService = inject(AuthorService);
  bookService = inject(BookService);
  authorName!:string;
  ngOnInit(): void {
    // this.getAuthor(this.book.authorId)
  }

  // getAuthor(authorId:number):void{
  //   this.authorService.getAuthorById(authorId)
  //   .subscribe(
  //     (author:Author) => this.authorName = author.name
  //   )
  // }

  getImageCover(id:number){
    return `${enviroment.apiUrl}/Books/${id}/cover`
  }
  onDelete(id:number){
    const isDeleted = confirm("Are you sure deleted " + this.book.name + " ?")
    console.log(id)
    if(isDeleted){
      this.bookService.deleteBookById(id).subscribe({
        next: (()=> {
          window.alert(`${this.book.name} is deleted`)
          this.book.id !== id
        }),
        error: ((err) => console.log(err))
      });
    }
  }
}
