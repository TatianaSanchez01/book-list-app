import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BookService } from '../../services/book.service';

import { CartComponent } from './cart.component';
import { Book } from '../../models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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

const MatDialogMock = {
  open: () => ({
    afterClosed: () => of(true),
  }),
};

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

describe('Cart Component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [
        BookService,
        // MatDialog
        {
          provide: MatDialog,
          useValue: MatDialogMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // service = fixture.debugElement.injector.get(BookService);
    service = TestBed.inject(BookService);
    jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook);
  });

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice greater than 0', () => {
    const totalPrice = component.getTotalPrice(listBook);

    expect(totalPrice).toBeGreaterThan(0);
  });

  it('getTotalPrice can not be 0', () => {
    const totalPrice = component.getTotalPrice(listBook);

    expect(totalPrice).not.toBe(0);
  });

  it('getTotalPrice can not be null', () => {
    const totalPrice = component.getTotalPrice(listBook);

    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    component.onInputNumberChange(action, book);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(book.amount).toBe(3);
  });

  it('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(1);
  });

  it('onClearBooks works correctly', () => {
    const spy1 = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    const spy2 = jest.spyOn(component as any, '_clearListCartBook');
    component.listCartBook = listBook;
    component.onClearBooks();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.listCartBook.length).toBe(0);
  });

  it('_clearListCartBook works correctly', () => {
    const spy = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    component.listCartBook = listBook;
    component['_clearListCartBook']();
    expect(spy).toHaveBeenCalled();
    expect(component.listCartBook.length).toBe(0);
  });

  it('The title "The cart is empty" is not displayed when the cart has products', () => {
    component.listCartBook = listBook;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#titleCartEmpty')
    );
    expect(debugElement).toBeFalsy();
  });

  it('The title "The cart is empty" is displayed when the cart has no products', () => {
    component.listCartBook = [];
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#titleCartEmpty')
    );
    expect(debugElement).toBeTruthy();
    if (debugElement) {
      const element: HTMLElement = debugElement.nativeElement;
      expect(element.innerHTML).toBe('The cart is empty');
    }
  });
});
