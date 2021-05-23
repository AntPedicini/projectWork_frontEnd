import { TestBed } from '@angular/core/testing';

import { ServiceAutoService } from './service-auto.service';

describe('ServiceAutoService', () => {
  let service: ServiceAutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
