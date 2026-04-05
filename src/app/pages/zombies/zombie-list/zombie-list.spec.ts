import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZombieList } from './zombie-list';

describe('ZombieList', () => {
  let component: ZombieList;
  let fixture: ComponentFixture<ZombieList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZombieList],
    }).compileComponents();

    fixture = TestBed.createComponent(ZombieList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
