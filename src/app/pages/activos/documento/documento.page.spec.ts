import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPage } from './documento.page';

describe('DocumentoPage', () => {
  let component: DocumentoPage;
  let fixture: ComponentFixture<DocumentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
