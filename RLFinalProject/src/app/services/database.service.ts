import { Injectable } from '@angular/core';
import {Student} from "../models/Student";
import {Observable} from "rxjs";
import {Book} from "../models/Book";
import {Reservation} from "../models/Reservation";

declare const openDatabase;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;
  private static errorHandler(error): any {
    console.error("Error : " + error.message);
  }

  constructor() { }
  private createDatabase(): any {
    var shortName = "RLFinalDB";
    var version = "1.0";
    var displayName = "DB for Angular final project";
    var dbSize = 2 * 1024 * 1024;

    function dbCreateSuccess() {
      console.info("Success: Database created successfully.");
    }

    this.db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
  }

  initDB() {
    if (this.db == null) {
      try {
        this.createDatabase();
        this.createStudentTables();
        this.createBookTables();
        this.createReservationTables();
      } catch (e) {
        console.error("Error in initDB() : " + e);
      }
    }
  }

  getDatabase() {
    this.initDB();
    return this.db;
  }

  // Student table
  private createStudentTables(): void {
    function txFunction(tx: any): void {
      console.info("Creating Table: students Table");
      var options = [];
      let sql: string = "CREATE TABLE IF NOT EXISTS students("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "studentNum VARCHAR(4) NOT NULL,"
        + "first VARCHAR(20) NOT NULL,"
        + "last VARCHAR(20) NOT NULL,"
        + "email VARCHAR(20) NOT NULL,"
        + "phone VARCHAR(20));";

      function successCreate() {
        console.info("Success: Create Students Table successful");
      }

      tx.executeSql(sql, options, successCreate, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: Transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public insertStudent(student: Student, callback) {
    function txFunction(tx) {
      var sql = "INSERT INTO students(studentNum, first, last, email, phone) VALUES(?,?,?,?,?);";
      let options = [student.studentNum,student.first,student.last,student.email,student.phone];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: Insert student transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public updateStudent(student: Student, callback): void {
    function txFunction(tx) {
      let sql = 'UPDATE students SET studentNum=?, first=?, last=?, email=?, phone=? WHERE id=?;';
      let options = [student.studentNum, student.first, student.last,student.email,student.phone,student.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: update student transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public deleteStudent(student: Student, callback): void {
    function txFunction(tx) {
      let sql = 'DELETE FROM students WHERE id=?;';
      let options = [student.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: delete student transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public selectStudent(id: number): Observable<any> {
    let options = [id];
    let student: Student = null;
    function txFunction(tx) {
      let sql = 'SELECT * FROM students WHERE id=?;';
      tx.executeSql(sql, options, (tx, results) => {
          let row = results.rows[0];
          student = new Student();
          student.id = row['id'];
          student.studentNum = row['studentNum'];
          student.first = row['first'];
          student.last = row['last'];
          student.email = row['email'];
          student.phone = row['phone'];
        }
        , DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: select student transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable(observer => {
      setTimeout(() => {
        if (student) {
          observer.next(student);
        } else {
          observer.error('error happend');
        }
      }, 100);
    });
  }

  public selectAllStudent(): Observable<any> {
    let options = [];
    let students: Student[] = [];

    function txFunction(tx) {
      let sql = 'SELECT * FROM students;';
      tx.executeSql(sql, options, (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows[i];
          let s = new Student();
          s.id = row['id'];
          s.studentNum = row['studentNum'];
          s.first = row['first'];
          s.last = row['last'];
          s.email = row['email'];
          s.phone = row['phone'];
          students.push(s);
        }
      }, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: SelectAll student transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable<any>((observer) => {
      setTimeout(()=>{
        if (students.length != 0) {
          observer.next(students);
        } else {
          observer.error("Select All returned 0 records");
        }
      }, 100);
    });
  }

  // Book table
  private createBookTables(): void {
    function txFunction(tx: any): void {
      console.info("Creating Table: books Table");
      var options = [];
      let sql: string = "CREATE TABLE IF NOT EXISTS books("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "name VARCHAR(4) NOT NULL,"
        + "author VARCHAR(20) NOT NULL,"
        + "year VARCHAR(4) NOT NULL);";

      function successCreate() {
        console.info("Success: Create Books Table successful");
      }

      tx.executeSql(sql, options, successCreate, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: Transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public insertBook(book: Book, callback) {
    function txFunction(tx) {
      var sql = "INSERT INTO books(name, author, year) VALUES(?,?,?);";
      let options = [book.name,book.author,book.year];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: Insert book transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public updateBook(book: Book, callback): void {
    function txFunction(tx) {
      let sql = 'UPDATE books SET name=?, author=?, year=? WHERE id=?;';
      let options = [book.name, book.author, book.year,book.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: update book transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public deleteBook(book: Book, callback): void {
    function txFunction(tx) {
      let sql = 'DELETE FROM books WHERE id=?;';
      let options = [book.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: delete book transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public selectBook(id: number): Observable<any> {
    let options = [id];
    let book: Book = null;
    function txFunction(tx) {
      let sql = 'SELECT * FROM books WHERE id=?;';
      tx.executeSql(sql, options, (tx, results) => {
          let row = results.rows[0];
          book = new Book();
          book.id = row['id'];
          book.name = row['name'];
          book.author = row['author'];
          book.year = row['year'];
        }
        , DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: select book transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable(observer => {
      setTimeout(() => {
        if (book) {
          observer.next(book);
        } else {
          observer.error('error happend');
        }
      }, 100);
    });
  }

  public selectAllBook(): Observable<any> {
    let options = [];
    let books: Book[] = [];

    function txFunction(tx) {
      let sql = 'SELECT * FROM books ORDER BY name;';
      tx.executeSql(sql, options, (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows[i];
          let b = new Book();
          b.id = row['id'];
          b.name = row['name'];
          b.author = row['author'];
          b.year = row['year'];
          books.push(b);
        }
      }, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: SelectAll book transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable<any>((observer) => {
      setTimeout(()=>{
        if (books.length != 0) {
          observer.next(books);
        } else {
          observer.error("Select All returned 0 records");
        }
      }, 100);
    });
  }

  // Reservation table
  private createReservationTables(): void {
    function txFunction(tx: any): void {
      console.info("Creating Table: reservations Table");
      var options = [];
      let sql: string = "CREATE TABLE IF NOT EXISTS reservations("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "roomNum VARCHAR(10) NOT NULL,"
        + "studentNum VARCHAR(20) NOT NULL,"
        + "period VARCHAR(20) NOT NULL,"
        + "FOREIGN KEY(studentNum) REFERENCES students(studentNum));";

      function successCreate() {
        console.info("Success: Create Reservations Table successful");
      }

      tx.executeSql(sql, options, successCreate, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: Transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public insertReservation(reservation: Reservation, callback) {
    function txFunction(tx) {
      var sql = "INSERT INTO reservations(roomNum, studentNum, period) VALUES(?,?,?);";
      let options = [reservation.roomNum,reservation.studentNum,reservation.period];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: Insert reservation transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public updateReservation(reservation: Reservation, callback): void {
    function txFunction(tx) {
      let sql = 'UPDATE reservations SET roomNum=?, studentNum=?, period=? WHERE id=?;';
      let options = [reservation.roomNum, reservation.studentNum, reservation.period,reservation.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: update reservation transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public deleteReservation(reservation: Reservation, callback): void {
    function txFunction(tx) {
      let sql = 'DELETE FROM reservations WHERE id=?;';
      let options = [reservation.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: delete reservation transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);
  }

  public selectReservation(id: number): Observable<any> {
    let options = [id];
    let reservation: Reservation = null;
    function txFunction(tx) {
      let sql = 'SELECT * FROM reservations WHERE id=?;';
      tx.executeSql(sql, options, (tx, results) => {
          let row = results.rows[0];
          reservation = new Reservation();
          reservation.id = row['id'];
          reservation.roomNum = row['roomNum'];
          reservation.studentNum = row['studentNum'];
          reservation.period = row['period'];
        }
        , DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: select reservation transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable(observer => {
      setTimeout(() => {
        if (reservation) {
          observer.next(reservation);
        } else {
          observer.error('error happend');
        }
      }, 100);
    });
  }

  public selectAllReservation(): Observable<any> {
    let options = [];
    let reservations: Reservation[] = [];

    function txFunction(tx) {
      let sql = 'SELECT * FROM reservations;';
      tx.executeSql(sql, options, (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows[i];
          let r = new Reservation();
          r.id = row['id'];
          r.roomNum = row['roomNum'];
          r.studentNum = row['studentNum'];
          r.period = row['period'];
          reservations.push(r);
        }
      }, DatabaseService.errorHandler);
    }

    function successTransaction() {
      console.info("Success: SelectAll reservation transaction successful");
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable<any>((observer) => {
      setTimeout(()=>{
        if (reservations.length != 0) {
          observer.next(reservations);
        } else {
          observer.error("Select All returned 0 records");
        }
      }, 100);
    });
  }

  public selectFilterReservation(room: string): Observable<any> {
    let options = [room];
    let reservations: Reservation[] = [];
    function txFunction(tx) {
      let sql = 'SELECT * FROM reservations WHERE roomNum=? ORDER BY period;';
      tx.executeSql(sql, options, (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let r = new Reservation();
            r.id = row['id'];
            r.roomNum = row['roomNum'];
            r.studentNum = row['studentNum'];
            r.period = row['period'];
            reservations.push(r);
          }
        }
        , DatabaseService.errorHandler);
    }
    function successTransaction() {
      console.info('Success: select filter reservation transaction successful');
    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, successTransaction);

    return new Observable<any>((observer) => {
      setTimeout(()=>{
        if (reservations.length != 0) {
          observer.next(reservations);
        } else {
          //observer.error("Select All returned 0 records");
        }
      }, 100);
    });
  }

}
