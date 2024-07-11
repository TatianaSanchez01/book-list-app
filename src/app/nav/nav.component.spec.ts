import 'zone.js';
import 'zone.js/testing';

import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';

class ComponentTestRoute {}

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: ComponentTestRoute },
          { path: 'cart', component: ComponentTestRoute },
        ]),
      ],
      declarations: [NavComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.navTo('home');

    expect(spy).toHaveBeenCalledWith(['home']);
  });

  it('should navigate to cart', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.navTo('cart');

    expect(spy).toHaveBeenCalledWith(['cart']);
  });
});
