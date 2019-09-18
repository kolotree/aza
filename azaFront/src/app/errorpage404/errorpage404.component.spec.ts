import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Errorpage404Component } from './errorpage404.component';

describe('Errorpage404Component', () => {
  let component: Errorpage404Component;
  let fixture: ComponentFixture<Errorpage404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Errorpage404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Errorpage404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
