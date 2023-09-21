import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from '../Logger/logger.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let calculator: CalculatorService;
  let mockLoggerService : any;  
 
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    mockLoggerService = jasmine.createSpyObj('loggerService', ['log']);  
    calculator = new CalculatorService(mockLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();    
    expect(calculator).toBeTruthy();
  });

  it('Should add two number', () => {
    let result = calculator.add(512, 512);
    expect(result).toEqual(1024);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('Should subtract two numbers', () => {
    let result = calculator.subtract(10, 2);
    expect(result).toBe(8);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);    
  })
});
