import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesEditPage } from './vehicles-edit.page';

describe('VehiclesEditPage', () => {
  let component: VehiclesEditPage;
  let fixture: ComponentFixture<VehiclesEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
