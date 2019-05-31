import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosPage } from './departamentos.page';

describe('DepartamentosPage', () => {
  let component: DepartamentosPage;
  let fixture: ComponentFixture<DepartamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
