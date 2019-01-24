import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesPage } from './episodes.page';

describe('EpisodesPage', () => {
  let component: EpisodesPage;
  let fixture: ComponentFixture<EpisodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
