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
      console.log(items);
      this.sumItemsCost();
    });
  }

  sumItemsCost() {
    this.items.forEach((item: Ingrediente) => {
      if (item.cost) {
        let cost = parseInt(item.cost);
        this.total += cost;
      }
    });
  }

}
