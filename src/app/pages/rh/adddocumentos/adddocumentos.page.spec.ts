import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocumentosPage } from './adddocumentos.page';

describe('AdddocumentosPage', () => {
  let component: AdddocumentosPage;
  let fixture: ComponentFixture<AdddocumentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddocumentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
