export class Reservation {
  id: number;
  roomNum: string;
  studentNum: string;
  period: string;

  constructor(roomNum?:string,studentNum?:string,period?: string) {
    this.roomNum = roomNum;
    this.studentNum = studentNum;
    this.period = period;
  }
}
