import { Component, OnInit } from '@angular/core';
import {Reservation} from "../models/Reservation";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(private database: DatabaseService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.database.selectAllReservation().subscribe((data)=>{
      this.reservations=data;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }

  btnAdd_click(room:string){
    localStorage.setItem('room',room);
    this.router.navigate(['addReservation']);
  }

  btnModify_click(reservation: Reservation){
    this.router.navigate(['modifyReservation/' + reservation.id]);
  }
  ShowAList(){
    this.reservations=null;
    this.database.selectFilterReservation("RoomA").subscribe((data)=>{
      this.reservations=data;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }
  ShowBList(){
    this.reservations=null;
    this.database.selectFilterReservation("RoomB").subscribe((data)=>{
      this.reservations=data;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }
  ShowCList(){
    this.reservations=null;
    this.database.selectFilterReservation("RoomC").subscribe((data)=>{
      this.reservations=data;
    },(err)=>{
      console.error("Error in ngOnInit: " + err);
    });
  }
}
