import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {Reservation} from "../../models/Reservation";
import {Student} from "../../models/Student";

@Component({
  selector: 'app-modify-reservation',
  templateUrl: './modify-reservation.component.html',
  styleUrls: ['./modify-reservation.component.css']
})
export class ModifyReservationComponent implements OnInit {
  students: Student[] = [];
  reservations: Reservation[] = [];
  @Input() whichRoom:string= localStorage.getItem('room');
  currentPeriod: string;
  constructor(private builder:FormBuilder,
              private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router) {
  }
  reservationForm = this.builder.group({
    _studentNum:['',[Validators.required]],
    _roomNum:[''],
    _period:['',[Validators.required,this.CheckOccupy()]]
  })
  reservation:Reservation;

  FindList(){
    let room = this.whichRoom;
    this.database.selectFilterReservation(room).subscribe((data) => {
      this.reservations = data;
    }, (err) => {
      console.error("Error in ngOnInit: " + err);
    });
  }

  ngOnInit(): void {
    this.database.selectAllStudent().subscribe((data)=>{
      this.students=data;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });

    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectReservation(id).subscribe((data)=>{
      this.reservation = data;
      this.reservationForm.get('_roomNum').setValue(this.reservation.roomNum);
      this.reservationForm.get('_studentNum').setValue(this.reservation.studentNum);
      this.reservationForm.get('_period').setValue(this.reservation.period);
      this.whichRoom = this.reservation.roomNum;
      this.currentPeriod = this.reservation.period;
    }, (err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }
  CheckOccupy(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {

      let period = control.value;
      let room = this.whichRoom;
      let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.database.selectReservation(id).subscribe((data)=>{
        this.reservation = data;
        this.currentPeriod = this.reservation.period;
      }, (err)=>{
        console.error("Error in ngOnInit: " + err);
      });

      this.database.selectFilterReservation(room).subscribe((data) => {
        this.reservations = data;
      }, (err) => {
        console.error("Error in ngOnInit: " + err);
      });
      console.info(this.currentPeriod);
      for (var i = 0; i < this.reservations.length; i++) {

        if (this.reservations[i].period == period && period!=this.currentPeriod) {
          this.reservations=[];
          return {'occupied': true}
        }
      }
      return null;
    }
  }
  btnUpdate_click() {
    this.reservation.roomNum = this.whichRoom;
    this.reservation.studentNum = this.reservationForm.get('_studentNum').value;
    this.reservation.period = this.reservationForm.get('_period').value;
    this.database.updateReservation(this.reservation, ()=>{
      //location.href="../reservation";
    });
    alert("Reservation updated successfully");
    this.router.navigate(['reservation']);
  }
  btnDelete_click(){
    this.database.deleteReservation(this.reservation, ()=>{
      //location.href="../reservation";
    });
    alert("Reservation deleted successfully");
    this.router.navigate(['reservation']);
  }
  btnCancel_click(){
    this.router.navigate(['reservation']);
    //location.href="../reservation";
  }
}

