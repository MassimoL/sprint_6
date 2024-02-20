import { Injectable } from '@angular/core';
import { BudgetOptions } from '../interfaces/budgetOptions.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public budgetOptions: BudgetOptions[] = [
    {
      title: 'Seo',
      description: "Programación de una campaña de SEO ",
      price: 300
    },
    {
      title: 'Ads',
      description: "Programación de una campaña de publicidad",
      price: 400
    },
    {
      title: 'Web',
      description: "Programación de una página web responsive",
      price: 500
    }
  ];

  private _extrasSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public extras$ = this._extrasSubject.asObservable();

  get extras(): number {
    return this._extrasSubject.value;
  }

  public calculateTotalPrice(nPages: number, nLanguages: number): number {
    const extras = (nPages * 30) + (nLanguages * 30);
    this._extrasSubject.next(extras);
    return extras;
}

  //public budgetList = signal <Budget[]>([]);

}