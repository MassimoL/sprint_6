import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ ReactiveFormsModule, ModalComponent ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  @Output() webPrice: EventEmitter<number> = new EventEmitter();

  public panelForm: FormGroup = this.fb.group({
    nPages: [1, [Validators.required, Validators.min(1)]],
    nLanguages: [1, [Validators.required, Validators.min(1)]],
  })

  constructor(
    public fb: FormBuilder,
    public budgetService: BudgetService,
  ) {};

  ngOnInit(): void {
    this.panelForm.valueChanges.subscribe(() => {
      const nPages = this.panelForm.get('nPages')?.value;
      const nLanguages = this.panelForm.get('nLanguages')?.value;
      console.log(nPages, nLanguages)

      if (this.panelForm.valid) {
        const extras = this.budgetService.calculateTotalPrice(nPages, nLanguages);
        this.webPrice.emit(extras);
        console.log(extras)
      }
    })
  }

  public addPages():void {
    const nPages = this.panelForm.get('nPages');
    if(nPages) {
      const currentNum = nPages.value || 1
      nPages.setValue(currentNum + 1);
    }
  }

  public subsPages():void {
    const nPages = this.panelForm.get('nPages');
    if(nPages) {
      const currentNum = nPages.value || 1;
      if(currentNum !== 1) {
        nPages.setValue(currentNum - 1);
      }
    }
  }

  public addLangs():void {
    const nLanguages = this.panelForm.get('nLanguages');
    if(nLanguages) {
      const currentNum = nLanguages.value || 1
      nLanguages.setValue(currentNum + 1);
    }
  }

  public subsLangs():void {
    const nLanguages = this.panelForm.get('nLanguages');
    if(nLanguages) {
      const currentNum = nLanguages.value || 1;
      if(currentNum !== 1) {
        nLanguages.setValue(currentNum - 1);
      }
    }
  }

}
