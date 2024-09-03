import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../authors.model';

@Component({
  selector: 'app-author-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './author-forms.component.html',
  styleUrl: './author-forms.component.css'
})
export class AuthorFormsComponent implements OnInit {
  @Input() id!:number;
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor(private authorService: AuthorService){}

  form = new FormGroup({
    name: new FormControl<string | null>('', {
      validators: [Validators.required],
    })
  });

  ngOnInit(): void {
    if(this.id){
      this.authorService.getAuthorById(this.id).subscribe({
        next: (author) => {
          const auth:Author = author as Author
          this.form.patchValue({name: auth.name})
        }
      })
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.id){ //kondisi update
        let body = this.form.value as Author;
        body.id = this.id;
        this.authorService.updateAuthor(this.id, body).subscribe({
          next: (author) => {console.log('berhasil update', author);
            this.router.navigate(['../..'], {relativeTo: this.route})
          }
        });
      }else{ //kondisi add new
        this.authorService.newAuthor(this.form.value as {name:string})
        .subscribe({
          next: (author) => {console.log('berhasil menambahkan', author);
          this.router.navigate(['../'], {relativeTo: this.route})
          },
          error: (err) => {
            console.log('gagal menambahkan data ', err);
            window.alert("Gagal Menambahkan data")
          }
        });
      }
    }
  }
}
