import { TestBed } from '@angular/core/testing';

import { IotDataService } from './iot-data.service';

describe('IotDataService', () => {
  let service: IotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
