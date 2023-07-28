import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, of } from 'rxjs';
import { Ingrediente } from '../interfaces/ingrediente.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  API = 'https://sheet.best/api/sheets/acfd09bb-b166-49d2-b7cd-295a9f5fb2e6/tabs';
  IngredientesQuincenales: Ingrediente[] = [];
  Despensa: Ingrediente[] = [];
  constructor(private httpService: HttpClient) { }

  public getSheetData() {
    return forkJoin([
      this.httpService.get(`${this.API}/Ingredientes Totales Quincenales?_format=records`),
      this.httpService.get(`${this.API}/Despensa?_format=records`)
    ]).pipe(
      map((data: any[]) => {
        const ingredientesParsed: Ingrediente[] = [];
        data[0].forEach((ingrediente: any) => {
          ingredientesParsed.push({
            Total: ingrediente["8"],
            Costo: ingrediente.Costo,
            Falta: ingrediente.Falta,
            Nombre: ingrediente.Ingredientes,
            Medida: ingrediente.Medida,
            Necesitamos: ingrediente["Necesitamos por quincena"],
            Index: ingrediente.Celda,
            Hoja: "Ingredientes Totales Quincenales"
          });
        });
        data[1].forEach((ingrediente: any) => {
          if (ingrediente["Cuantos?"] !== "0" && ingrediente["Cuantos?"] !== "Cuanto?") {
            ingredientesParsed.push({
              Total: ingrediente["8"],
              Costo: ingrediente.Precio,
              Falta: ingrediente["Cuantos?"],
              Nombre: ingrediente.Higiene,
              Medida: "pcs",
              Necesitamos: ingrediente["Cuantos?"],
              Index: ingrediente.Celda,
              Hoja: "Despensa"
            });
          }
        });
        return ingredientesParsed;
      })
    );
  }


  public updateCost(cost: number, row: string, sheetname: string) {
    let valueToUpdate = {};
    if (sheetname === "Despensa") {
      valueToUpdate = {
        Precio: cost
      };
    } else {
      valueToUpdate = {
        Costo: cost
      };
    }
    return this.httpService.patch(`${this.API}/${sheetname}/${row}`, valueToUpdate);
  }

}
