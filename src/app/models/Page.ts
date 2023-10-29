export class Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;

  constructor(
    content: T[] = [],
    totalPages: number = 0,
    totalElements: number = 0,
    last: boolean = false,
    size: number = 0,
    number: number = 0,
    numberOfElements: number = 0,
    first: boolean = false,
    empty: boolean = false
  ) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.last = last;
    this.size = size;
    this.number = number;
    this.numberOfElements = numberOfElements;
    this.first = first;
    this.empty = empty;
  }
}
