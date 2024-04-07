import { Component } from '@angular/core';
import { UserDataService } from '../user-data.service'; // Import UserDataService

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  propertyAmount: number | undefined;
  loanAmount: number | undefined;
  termAmount: number | undefined;
  interest: number | undefined;
  monthlyPayment: number | undefined;
  totalPayment: number | undefined;
  totalInterest: number | undefined;
  termOptions: number[] = [5, 10, 15, 20, 25, 30, 35, 40];

  constructor(private userDataService: UserDataService) {} // Inject UserDataService

  calculateMortgage(): void {
    if (this.propertyAmount && this.loanAmount && this.propertyAmount >= this.loanAmount * 1.1) {
      const monthlyInterest = this.interest! / 100 / 12;
      const numberOfPayments = this.termAmount! * 12;
      this.monthlyPayment = (this.loanAmount! * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));
      this.totalPayment = this.monthlyPayment * numberOfPayments;
      this.totalInterest = this.totalPayment - this.loanAmount!;
      
      // Save the quote using UserDataService
      const quote = {
        propertyAmount: this.propertyAmount,
        loanAmount: this.loanAmount,
        termAmount: this.termAmount,
        interest: this.interest,
        monthlyPayment: this.monthlyPayment,
        totalPayment: this.totalPayment,
        totalInterest: this.totalInterest
      };
      this.userDataService.addSavedQuote(quote).subscribe(
        () => {
          console.log('Quote saved successfully');
        },
        (error) => {
          console.error('Error saving quote:', error);
        }
      );
    } else {
      alert("Loan amount cannot exceed 90% of the property amount.");
    }
  }
}