import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrabajosaPage } from './addtrabajosa.page';

describe('AddtrabajosaPage', () => {
  let component: AddtrabajosaPage;
  let fixture: ComponentFixture<AddtrabajosaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrabajosaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrabajosaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
