import { TestBed } from '@angular/core/testing';

import { MailService } from './mail.service';

describe('MailServiceService', () => {
  let service: MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
