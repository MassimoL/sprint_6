import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('budgetOptions should be an array', () => {
    expect(service.budgetOptions instanceof Array).toBe(true);
  });

  it('calculateTotalPrice it should be declared', () => {
    expect(typeof service.calculateTotalPrice).toBe('function');
  });

  it('calculateTotalPrice should return a number', () => {
    const result = service.calculateTotalPrice(5, 10);
    expect(typeof result).toBe('number');
  });

  it('calculateTotalPrice should return different from NaN', () => {
    const result = service.calculateTotalPrice(5, 10);
    expect(typeof result).not.toBeNaN();
  });

});

