import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentComponent} from './student/student.component';
import {BookComponent} from "./book/book.component";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {ModifyStudentComponent} from "./student/modify-student/modify-student.component";
import {AddStudentComponent} from "./student/add-student/add-student.component";
import {ModifyBookComponent} from "./book/modify-book/modify-book.component";
import {AddBookComponent} from "./book/add-book/add-book.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {AddReservationComponent} from "./reservation/add-reservation/add-reservation.component";
import {ModifyReservationComponent} from "./reservation/modify-reservation/modify-reservation.component";
import {MapComponent} from "./map/map.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'student', component: StudentComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'book', component: BookComponent},
  {path: 'map', component: MapComponent},
  {path: 'about', component: AboutComponent},
  {path: 'modifyStudent/:id', component: ModifyStudentComponent},
  {path: 'addStudent', component: AddStudentComponent},
  {path: 'modifyBook/:id', component: ModifyBookComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'modifyReservation/:id', component: ModifyReservationComponent},
  {path: 'addReservation', component: AddReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
