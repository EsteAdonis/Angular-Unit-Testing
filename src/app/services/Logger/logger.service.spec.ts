import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should add message', () => {
    let message = "Add operation executed";
    service.log(message);
    expect(service.messages.length).toBe(1);
  })

  it(`Should Match The Message 'Add operation executed'`, () => {
    let message = "Add operation executed";
    service.log(message);
    expect(service.messages.find(message => message === "Add operation executed")).toBeTruthy();
  })

  it('Should be empty', () => {
    service.clear();
    expect(service.messages.length).toBe(0);
  })
});
