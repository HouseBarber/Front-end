import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrichComponent } from './user-enrich.component';

describe('UserEnrichComponent', () => {
  let component: UserEnrichComponent;
  let fixture: ComponentFixture<UserEnrichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEnrichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
