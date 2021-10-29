export class Student {
  id: number;
  studentNum: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  constructor(studentNum?:string,first?: string, last?: string, email?:string, phone?:string) {
    this.studentNum = studentNum;
    this.first = first;
    this.last = last;
    this.email = email;
    this.phone = phone;
  }
}
