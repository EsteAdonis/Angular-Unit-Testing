import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from '../Logger/logger.service';

describe('CalculatorService', () => {
  let calculator: CalculatorService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
 
  beforeEach(() => {
    const mockLoggerService = jasmine.createSpyObj('loggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService, 
        { provide: LoggerService, useValue: mockLoggerService }
      ]
    });    

    calculator = TestBed.inject(CalculatorService);
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it('should be created', () => {
    expect(calculator).toBeTruthy();
  });

  it('Should add two number', () => {
    let result = calculator.add(512, 512);
    expect(result).toEqual(1024);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('Should subtract two numbers', () => {
    let result = calculator.subtract(10, 2);
    expect(result).toBe(8);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);    
  })
});
