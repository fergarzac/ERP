import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgastosPage } from './addgastos.page';

describe('AddgastosPage', () => {
  let component: AddgastosPage;
  let fixture: ComponentFixture<AddgastosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgastosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
