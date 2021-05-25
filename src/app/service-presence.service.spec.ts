import { TestBed } from '@angular/core/testing';

import { ServicePresenceService } from './service-presence.service';

describe('ServicePresenceService', () => {
  let service: ServicePresenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePresenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
