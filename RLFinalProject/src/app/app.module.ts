import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { NavComponent } from './nav/nav.component';
import { BookComponent } from './book/book.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { ModifyStudentComponent } from './student/modify-student/modify-student.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ModifyBookComponent } from './book/modify-book/modify-book.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ModifyReservationComponent } from './reservation/modify-reservation/modify-reservation.component';
import { AddReservationComponent } from './reservation/add-reservation/add-reservation.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    NavComponent,
    BookComponent,
    AboutComponent,
    HomeComponent,
    AddStudentComponent,
    ModifyStudentComponent,
    ModifyBookComponent,
    AddBookComponent,
    ReservationComponent,
    ModifyReservationComponent,
    AddReservationComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
