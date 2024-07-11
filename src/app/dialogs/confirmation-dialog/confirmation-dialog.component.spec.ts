import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

const MatDialogMock = {
  close: () => null,
};

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm should close dialog', () => {
    const service = TestBed.inject(MatDialogRef);
    const closeSpy = jest.spyOn(service, 'close');
    component.onConfirm();
    expect(closeSpy).toHaveBeenCalledWith(true);
    expect(closeSpy).not.toHaveBeenCalledWith(false);
  });

  it('onDismiss should close dialog', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const closeSpy = jest.spyOn(service, 'close');
    component.onDismiss();
    expect(closeSpy).toHaveBeenCalledWith(false);
  });
});
