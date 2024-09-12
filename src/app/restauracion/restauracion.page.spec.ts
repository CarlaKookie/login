import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestauracionPage } from './restauracion.page';

describe('RestauracionPage', () => {
  let component: RestauracionPage;
  let fixture: ComponentFixture<RestauracionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
