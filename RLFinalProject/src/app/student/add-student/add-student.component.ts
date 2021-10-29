import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {Student} from "../../models/Student";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  students: Student[] = [];

  constructor(private builder: FormBuilder,
              private database: DatabaseService,
              private router: Router) {

  }

  studentForm = this.builder.group({
    _studentNum:['',[Validators.required, Validators.pattern(/^\d{4}$/), this.CheckUnique()]],
    _first:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    _last:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    _email:['',[Validators.required, Validators.pattern(/^.+@conestogac.on.ca$/)]],
    _phone:['',[Validators.pattern(/(^[1-9]\d{2}-\d{3}-\d{4}$)|(^[1-9]\d{2}\s\d{3}\s\d{4}$)|(^[1-9]\d{2}\d{3}\d{4}$)/)]]
  })

  ngOnInit(): void {

  }

  CheckUnique(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {

      const studentNum = control.value;

      this.database.selectAllStudent().subscribe((data) => {
        this.students = data;
      }, (err) => {
        console.error("Error in ngOnInit: " + err);
      });


      for (var i = 0; i < this.students.length; i++) {
        if (this.students[i].studentNum === studentNum) {
          return {'checkExist': true}
        }
      }
      return null;
    }
  }

  btnAdd_click(){
    let student: Student = new Student
    (this.studentForm.get('_studentNum').value,
      this.studentForm.get('_first').value,
      this.studentForm.get('_last').value,
      this.studentForm.get('_email').value,
      this.studentForm.get('_phone').value);

    this.database.insertStudent(student, ()=>{
      //location.href="../student";
    });
    alert("Student added successfully");
    this.router.navigate(['student']);
  }

}
