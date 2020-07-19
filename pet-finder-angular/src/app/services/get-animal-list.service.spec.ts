import { TestBed } from '@angular/core/testing';

import { GetAnimalListService } from './get-animal-list.service';

describe('GetAnimalListService', () => {
  let service: GetAnimalListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAnimalListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
