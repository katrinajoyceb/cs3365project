import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Landing2Page } from './landing2.page';

describe('Landing2Page', () => {
  let component: Landing2Page;
  let fixture: ComponentFixture<Landing2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Landing2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Landing2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
