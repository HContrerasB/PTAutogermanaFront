import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZombieForm } from './zombie-form';

describe('ZombieForm', () => {
  let component: ZombieForm;
  let fixture: ComponentFixture<ZombieForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZombieForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ZombieForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
