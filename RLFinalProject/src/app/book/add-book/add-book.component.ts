import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private builder: FormBuilder,
              private database: DatabaseService,
              private router: Router) {
  }

  bookForm = this.builder.group({
    _name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    _author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    _year:['',[Validators.required, Validators.pattern(/^(14|15|16|17|18|19|20)\d{2}$/)]],
  })

  ngOnInit(): void {
  }
  btnAdd_click(){
    let book: Book = new Book
    (this.bookForm.get('_name').value,
      this.bookForm.get('_author').value,
      this.bookForm.get('_year').value);

    this.database.insertBook(book, ()=>{
      //location.href="../book";
    });
    alert("Book added successfully");
    this.router.navigate(['book']);
  }

}
