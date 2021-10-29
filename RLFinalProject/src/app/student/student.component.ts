import { Component, OnInit } from '@angular/core';
import {Student} from "../models/Student";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  constructor(private database: DatabaseService,
              private router:Router) { }

  ngOnInit(): void {
    this.database.selectAllStudent().subscribe((data)=>{
      this.students=data;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }

  btnAdd_click(){
    this.router.navigate(['addStudent']);
  }

  btnModify_click(student: Student){
    this.router.navigate(['modifyStudent/' + student.id]);
  }

}
