import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrousselHomeComponent } from './carroussel-home.component';

describe('CarrousselHomeComponent', () => {
  let component: CarrousselHomeComponent;
  let fixture: ComponentFixture<CarrousselHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrousselHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrousselHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
