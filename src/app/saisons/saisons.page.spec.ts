import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisonsPage } from './saisons.page';

describe('SaisonsPage', () => {
  let component: SaisonsPage;
  let fixture: ComponentFixture<SaisonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisonsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
