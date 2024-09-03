import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../authors/author.service';
import { Author } from '../../authors/authors.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../book.model';
import { ConvertDate } from '../../shared/helper';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  @Input() id!:number;
  authors!:Author[];
  authorService = inject(AuthorService);
  bookService = inject(BookService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  imageCoveer:string = "";
  form  = new FormGroup({
    name: new FormControl<string |null>('',{
      validators: [Validators.required]
    }),
    cover: new FormControl<File | null>(null, {
      validators: [Validators.required]
    }),
    releaseDate: new FormControl('', {
      validators: [Validators.required]
    }),
    authorId: new FormControl('', {
      validators: [Validators.required]
    })
  });
  ngOnInit(): void {
    if(this.id){
      this.bookService.getBookById(this.id).subscribe({
        next: ((Book) => {
          const book: Book = Book as Book;
          this.form.patchValue({
            name: book.name
          });
          this.form.patchValue({authorId : book.author.id.toString()})
          this.form.patchValue({
            // yyyy/MM/dd
            releaseDate: ConvertDate.ConvertToddMMyyyy(new Date(book.releaseDate))
          })
          this.imageCoveer = "http://localhost:5090/api/Books/" + book.id +"/cover"
          console.log(new Date(book.releaseDate))
        })
      })

    }
    this.authorService.getAllAuthors().subscribe({
      next: ((author) => this.authors = author)
    });
  }

  onFileSelected(event:Event):void{
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      let cover:File | null = input.files![0];
      this.form.patchValue({ cover:cover }); // Simpan nama file ke form control
      // console.log('Selected file:', fileName);  // Cetak nama file ke console
      console.log(cover)

      this.imageCoveer = URL.createObjectURL(cover);
    }
  }

  onSubmit(){
    // console.log("test")
    this.bookService.addNewBook({
      name:  this.form.value.name!,
      cover: this.form.value.cover,
      releaseDate: this.form.value.releaseDate!,
      authorId: Number(this.form.value.authorId)!
    }).subscribe({
      next: () => {
        console.log(this.bookService.addNewBook)
        window.alert('Add Data Done');
        this.router.navigate(['../'], {relativeTo: this.route})
      },
      error: () => {
        window.alert("Failed Add Data")
      }
    });
  }
}
