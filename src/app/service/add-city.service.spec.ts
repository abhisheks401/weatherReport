import { TestBed, inject } from '@angular/core/testing';

import { AddCityService } from './add-city.service';

describe('AddCityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddCityService]
    });
  });

  it('should be created', inject([AddCityService], (service: AddCityService) => {
    expect(service).toBeTruthy();
  }));
});
