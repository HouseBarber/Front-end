import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutSessionComponent } from './logout-session.component';

describe('LogoutSessionComponent', () => {
  let component: LogoutSessionComponent;
  let fixture: ComponentFixture<LogoutSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
