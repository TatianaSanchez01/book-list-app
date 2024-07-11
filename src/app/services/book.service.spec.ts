import '@angular/compiler';

import 'zone.js';
import 'zone.js/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import swal from 'sweetalert2';

import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 2,
  },
];

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBook returns a book list and does a get method', () => {
    service.getBooks().subscribe((books: Book[]) => {
      expect(books).toEqual(listBook);
    });

    const req = httpMock.expectOne(`${environment.API_REST_URL}/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('getBooksFromCar returns an empty array when localStorage is empty', () => {
    const books = service.getBooksFromCart();
    expect(books.length).toBe(0);
  });

  it('getBooksFromCart returns a book list from localStorage', () => {
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    const books = service.getBooksFromCart();
    expect(books.length).toBe(3);
  });

  it('addBookToCart adds a book to localStorage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
    };

    const toastMock = {
      fire: () => null,
    } as any;

    const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });

    let books = service.getBooksFromCart();

    expect(books.length).toBe(0);
    service.addBookToCart(book);
    books = service.getBooksFromCart();

    expect(spy1).toHaveBeenCalled();
    expect(books.length).toBe(1);
  });

  it('removeBookFromCart removes a book from localStorage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
    };

    const toastMock = {
      fire: () => null,
    } as any;

    jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });

    service.addBookToCart(book);
    let books = service.getBooksFromCart();
    expect(books.length).toBe(1);

    service.removeBooksFromCart();
    books = service.getBooksFromCart();

    expect(books.length).toBe(0);
  });
});
