import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Author } from '../authors.model';
import { AuthorService } from '../author.service';
import { AuthorComponent } from './author/author.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink, AuthorComponent],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent implements OnInit {
  authors!: Author[];
  isLoading:boolean = true;
  errorMessage?: string;
  destroyRef = inject(DestroyRef);
  constructor(private authorService: AuthorService){}
  ngOnInit(): void {
    const subription = this.authorService.getAllAuthors().subscribe({
      next: (authors) => (this.authors = authors),
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err.errorMessage
      }
    });

    this.destroyRef.onDestroy(() => subription.unsubscribe())
  }
  // updateList(){
  //   const subription = this.authorService.getAllAuthors().subscribe({
  //     next: (authors) => (this.authors = authors),
  //     error: (err) => {
  //       this.isLoading = false
  //       this.errorMessage = err.errorMessage
  //     }
  //   });

  //   this.destroyRef.onDestroy(() => subription.unsubscribe())
  // }
}
