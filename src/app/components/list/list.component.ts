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
  public items: any;
  public itemsLength: number = 0;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
    this.getItems();
  }

  refresh() {
    this.getItems();
  }

  getItems() {
    this.shoppingListService.getSheetData().subscribe(items => {
      this.items = items;
      this.items.sort((item: { name: string; }, b: { name: any; }) => item.name.localeCompare(b.name));
      this.sumItemsCost();
      this.itemsLength = this.items.length;
    });
  }

  sumItemsCost() {
    this.total = 0;
    this.items.forEach((item: Ingrediente) => {
      if (item.cost) {
        let cost = parseFloat(item.cost);
        this.total = this.total + cost;
      }
    });
  }

}
