import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Ingrediente } from '../interfaces/ingrediente.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private httpService: HttpClient) {}

  public getSheetData() {
    return this.httpService.get('https://superlist.onrender.com/api/getList');
  }

  public updateCost(cost: number, cell: string) {
    return this.httpService.put(`https://superlist.onrender.com/api/updateCost/${cost.toString()}/${cell}`, {});
  }

}
