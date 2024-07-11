import 'zone.js';
import 'zone.js/testing';

import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HomeComponent } from './home.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';

const bookServiceMock = {
  getBooks: () => of(listBook),
};

@Pipe({name: 'reduceText' })
class ReduceTextPipeMock implements PipeTransform {
  transform(): string {
    return '';
  }

}

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

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ReduceTextPipeMock],
      providers: [
        // BookService
        {
          provide: BookService,
          useValue: 
            bookServiceMock,
          
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks get books from suscription', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    // const spy = jest
    //   .spyOn(bookService, 'getBooks')
    //   .mockReturnValueOnce(of(listBook));
    component.getBooks();
    // expect(spy).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listBook);
  });
});
