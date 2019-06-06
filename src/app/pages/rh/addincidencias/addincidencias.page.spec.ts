import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddincidenciasPage } from './addincidencias.page';

describe('AddincidenciasPage', () => {
  let component: AddincidenciasPage;
  let fixture: ComponentFixture<AddincidenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddincidenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddincidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
