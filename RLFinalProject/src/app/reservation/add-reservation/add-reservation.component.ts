import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {Reservation} from "../../models/Reservation";
import {Student} from "../../models/Student";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  students: Student[] = [];
  reservations: Reservation[] = [];
  @Input() whichRoom:string = localStorage.getItem('room');
  constructor(private builder: FormBuilder,
              private database: DatabaseService,
              private router: Router) {
  }

  reservationForm = this.builder.group({
    _studentNum:['',[Validators.required]],
    _roomNum:[''],
    _period:['',[Validators.required,this.CheckOccupy()]]
  })

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
  }

  CheckOccupy(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {
      let period = control.value;
      let room = this.whichRoom;
      this.database.selectFilterReservation(room).subscribe((data) => {
        this.reservations = data;
      }, (err) => {
        console.error("Error in ngOnInit: " + err);
      });
        for (var i = 0; i < this.reservations.length; i++) {

          if (this.reservations[i].period == period) {
            this.reservations=[];
            return {'occupied': true}
          }
        }
      return null;
    }
  }

  btnAdd_click(){
      let reservation: Reservation = new Reservation
      (this.whichRoom,
        this.reservationForm.get('_studentNum').value,
        this.reservationForm.get('_period').value);

      this.database.insertReservation(reservation, ()=>{
        //location.href="../reservation";
      });
    alert("Reservation added successfully");
    this.router.navigate(['reservation']);
  }

}
