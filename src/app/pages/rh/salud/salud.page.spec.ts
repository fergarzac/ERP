import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludPage } from './salud.page';

describe('SaludPage', () => {
  let component: SaludPage;
  let fixture: ComponentFixture<SaludPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaludPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
