import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingrediente } from 'src/app/interfaces/ingrediente.interface';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public total = 0;
  public items: Ingrediente[] = [];
  public itemsLength: number = 0;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
    this.getItems();
  }

  refresh() {
    this.getItems();
  }

  getItems() {
    this.shoppingListService.getSheetData().subscribe((ingredientes: any) => {
      this.items = ingredientes;
      this.sumItemsCost();
      this.itemsLength = this.items.length;
    });
  }

  sumItemsCost() {
    this.total = 0;
    this.items.forEach((item: Ingrediente) => {
      if (item.Costo) {
        let cost = parseFloat(item.Costo);
        this.total = this.total + cost;
      }
    });
  }

}
