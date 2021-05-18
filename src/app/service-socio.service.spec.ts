import { TestBed } from '@angular/core/testing';

import { ServiceSocioService } from './service-socio.service';

describe('ServiceSocioService', () => {
  let service: ServiceSocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
