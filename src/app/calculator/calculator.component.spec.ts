import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { UserDataService } from '../user-data.service';
import { of } from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['addSavedQuote']);

    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      providers: [
        { provide: UserDataService, useValue: spy }
      ]
    })
    .compileComponents();

    userDataServiceSpy = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate mortgage correctly', () => {
    component.propertyAmount = 200000;
    component.loanAmount = 150000;
    component.termAmount = 30;
    component.interest = 4.5;

    component.calculateMortgage();

    expect(component.monthlyPayment).toBeCloseTo(760.03, 2);
    expect(component.totalPayment).toBeCloseTo(273610.80, 2);
    expect(component.totalInterest).toBeCloseTo(123610.80, 2);

    expect(userDataServiceSpy.addSavedQuote).toHaveBeenCalledOnceWith({
      propertyAmount: 200000,
      loanAmount: 150000,
      termAmount: 30,
      interest: 4.5,
      monthlyPayment: 760.03,
      totalPayment: 273610.80,
      totalInterest: 123610.80
    });
  });

  it('should not calculate mortgage if loan amount exceeds 90% of property amount', () => {
    component.propertyAmount = 100000;
    component.loanAmount = 100000;

    spyOn(window, 'alert');

    component.calculateMortgage();

    expect(window.alert).toHaveBeenCalledWith("Loan amount cannot exceed 90% of the property amount.");
    expect(userDataServiceSpy.addSavedQuote).not.toHaveBeenCalled();
  });
});