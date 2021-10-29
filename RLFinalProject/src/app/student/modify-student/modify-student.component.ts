import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {Student} from "../../models/Student";

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.css']
})
export class ModifyStudentComponent implements OnInit {
  students: Student[] = [];
  currentNumber: String;

  constructor(private builder:FormBuilder,
              private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router) {
  }

  studentForm = this.builder.group({
    _studentNum:['',[Validators.required, Validators.pattern(/^\d{4}$/), this.CheckUnique()]],
    _first:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    _last:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    _email:['',[Validators.required, Validators.pattern(/^.+@conestogac.on.ca$/)]],
    _phone:['',[Validators.pattern(/(^[1-9]\d{2}-\d{3}-\d{4}$)|(^[1-9]\d{2}\s\d{3}\s\d{4}$)|(^[1-9]\d{2}\d{3}\d{4}$)/)]]
  });
  student:Student;

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectStudent(id).subscribe((data)=>{
      this.student = data;
      this.studentForm.get('_studentNum').setValue(this.student.studentNum);
      this.studentForm.get('_first').setValue(this.student.first);
      this.studentForm.get('_last').setValue(this.student.last);
      this.studentForm.get('_email').setValue(this.student.email);
      this.studentForm.get('_phone').setValue(this.student.phone);
      this.currentNumber = this.student.studentNum;
    }, (err)=>{
      console.error("Error in ngOnInit: " + err);
    });
    this.currentNumber = this.student.studentNum;
  }
  CheckUnique(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {

      const studentNum = control.value;
      let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.database.selectStudent(id).subscribe((data)=>{
        this.student = data;
        this.currentNumber = this.student.studentNum;
      }, (err)=>{
        console.error("Error in ngOnInit: " + err);
      });

      this.database.selectAllStudent().subscribe((data) => {
        this.students = data;
      }, (err) => {
        console.error("Error in ngOnInit: " + err);
      });
      //this.currentNumber = this.student.studentNum;
      console.info(this.currentNumber);
      for (var i = 0; i < this.students.length; i++) {
        if (this.students[i].studentNum === studentNum && studentNum!=this.currentNumber) {
          return {'checkExist': true}
        }
      }
      return null;
    }
  }

  btnUpdate_click() {
    this.student.studentNum = this.studentForm.get('_studentNum').value;
    this.student.first = this.studentForm.get('_first').value;
    this.student.last = this.studentForm.get('_last').value;
    this.student.email = this.studentForm.get('_email').value;
    this.student.phone = this.studentForm.get('_phone').value;
    this.database.updateStudent(this.student, ()=>{
      //location.href="../student";
    });
    alert("Student updated successfully");
    this.router.navigate(['student']);
  }
  btnDelete_click(){
    this.database.deleteStudent(this.student, ()=>{
      //location.href="../student";
    });
    alert("Student deleted successfully");
    this.router.navigate(['student']);
  }
  btnCancel_click(){
    this.router.navigate(['student']);
    //location.href="../student";
  }
}
