import { TestBed } from '@angular/core/testing';

import { Defense } from './defense';

describe('Defense', () => {
  let service: Defense;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Defense);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
