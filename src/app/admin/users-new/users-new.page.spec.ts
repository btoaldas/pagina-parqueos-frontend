import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersNewPage } from './users-new.page';

describe('UsersNewPage', () => {
  let component: UsersNewPage;
  let fixture: ComponentFixture<UsersNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
