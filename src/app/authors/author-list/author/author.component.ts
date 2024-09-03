import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Author } from '../../authors.model';
import { AuthorService } from '../../author.service';

@Component({
  selector: 'tr[app-author]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  @Input({required:true}) author!: Author;
  // @Output() deleted = new EventEmitter<void>()


  constructor(private authorService:AuthorService){};
  onDelete(id:number){
    const isDelete = window.confirm("Yakin ingin dihapus?");
    if(isDelete){
      this.authorService.deleteAuthorById(id).subscribe({
        next: () => {
          window.alert("Berhasil menghapus author atasnama " + this.author.name)
          this.author.id !== id
          // this.deleted.emit()
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
