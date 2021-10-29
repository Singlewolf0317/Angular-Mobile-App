import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent implements OnInit {

  constructor(private builder:FormBuilder,
              private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router) {
  }
  bookForm = this.builder.group({
    _name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    _author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    _year:['',[Validators.required, Validators.pattern(/^(14|15|16|17|18|19|20)\d{2}$/)]],
  });
  book: Book;

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectBook(id).subscribe((data)=>{
      this.book = data;
      this.bookForm.get('_name').setValue(this.book.name);
      this.bookForm.get('_author').setValue(this.book.author);
      this.bookForm.get('_year').setValue(this.book.year);
    }, (err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }
  btnUpdate_click() {
    this.book.name = this.bookForm.get('_name').value;
    this.book.author = this.bookForm.get('_author').value;
    this.book.year = this.bookForm.get('_year').value;
    this.database.updateBook(this.book, ()=>{
      //location.href="../book";
    });
    alert("Book updated successfully");
    this.router.navigate(['book']);
  }
  btnDelete_click(){
    this.database.deleteBook(this.book, ()=>{
      //location.href="../book";
    });
    alert("Book deleted successfully");
    this.router.navigate(['book']);
  }
  btnCancel_click(){
    this.router.navigate(['book']);
    //location.href="../book";
  }
}
