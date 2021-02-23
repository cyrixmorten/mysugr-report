import { TestBed } from '@angular/core/testing';

import { Mysugr.TagsService } from './mysugr.tags.service';

describe('Mysugr.TagsService', () => {
  let service: Mysugr.TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mysugr.TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
