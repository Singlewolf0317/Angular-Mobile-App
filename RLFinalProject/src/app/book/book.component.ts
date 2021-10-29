import { Component, OnInit } from '@angular/core';
import {Book} from "../models/Book";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  allBooks: Book[]=[];
  books: Book[] = [];
  searchBooks: Book[] = [];
  constructor(private database: DatabaseService,
              private router:Router,
              private builder: FormBuilder) {
  }
  bookForm = this.builder.group({
    _search:['','']
  })

  ngOnInit(): void {
    this.database.selectAllBook().subscribe((data)=>{
      this.allBooks=data;
      this.books=this.allBooks;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }
  btnSearch_click(){
    this.books=[];
    let s: string = this.bookForm.get('_search').value;
    for (var i = 0; i < this.allBooks.length; i++) {

      if (this.allBooks[i].name.toUpperCase().includes(s.toUpperCase())||this.allBooks[i].name.toLowerCase().includes(s.toLocaleLowerCase())) {
        this.books.push(this.allBooks[i]);
      }
    }
  }
  btnAdd_click(){
    this.router.navigate(['addBook']);
  }

  btnModify_click(book: Book){
    this.router.navigate(['modifyBook/' + book.id]);
  }
}
