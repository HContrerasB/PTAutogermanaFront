import { TestBed } from '@angular/core/testing';

import { Zombie } from './zombie';

describe('Zombie', () => {
  let service: Zombie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Zombie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
