import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersEditPage } from './users-edit.page';

describe('UsersEditPage', () => {
  let component: UsersEditPage;
  let fixture: ComponentFixture<UsersEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
