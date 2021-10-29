export class Book {
  id: number;
  name: string;
  author: string;
  year: string;
  constructor(name?: string, author?: string, year?:string) {
    this.name = name;
    this.author = author;
    this.year = year;
  }
}
