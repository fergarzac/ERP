import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajosaPage } from './trabajosa.page';

describe('TrabajosaPage', () => {
  let component: TrabajosaPage;
  let fixture: ComponentFixture<TrabajosaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajosaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajosaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
