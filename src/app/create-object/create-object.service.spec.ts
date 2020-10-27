import { TestBed } from '@angular/core/testing';

import { CreateObjectService } from './create-object.service';

describe('CreateObjectService', () => {
  let service: CreateObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
