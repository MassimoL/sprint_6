import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { BudgetOptions } from '../interfaces/budgetOptions.interface';
import { PanelComponent } from '../panel/panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ReactiveFormsModule, PanelComponent, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  public options: BudgetOptions[] = this.budgetOptions.budgetOptions;
  public currentBudget: number = 0;

  public checkBoxForm : FormGroup = this.fb.group({
    box1: [false],
    box2: [false],
    box3: [false],
  });

  constructor(
    public fb: FormBuilder,
    public budgetOptions: BudgetService
    ) {}

  ngOnInit(): void {
    this.checkBoxForm.valueChanges.subscribe(() => {
      this.updatePrice();
    });

    this.budgetOptions.extras$.subscribe((extras) => {
      this.updatePrice(extras);
    })

  }

  public updatePrice(extras = 0): void {
    let currentBudget = 0;

    if (this.checkBoxForm.get('box1')?.value) {
      currentBudget += this.options[0].price;
    }

    if (this.checkBoxForm.get('box2')?.value) {
      currentBudget += this.options[1].price;
    }

    if (this.checkBoxForm.get('box3')?.value) {
      currentBudget += this.options[2].price + extras;
    }

    this.currentBudget = currentBudget;
  }


}




