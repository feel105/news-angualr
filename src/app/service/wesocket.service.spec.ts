import { TestBed } from '@angular/core/testing';

import { WesocketService } from './wesocket.service';

describe('WesocketService', () => {
  let service: WesocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WesocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
