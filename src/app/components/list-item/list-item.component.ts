import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingrediente } from 'src/app/interfaces/ingrediente.interface';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  public isEditting = false;
  @Output('refresh') public refresh: EventEmitter<void> = new EventEmitter();
  constructor(private shoppingListService: ShoppingListService) {

  }

  @Input('item') public item: Ingrediente = {
    cost: "",
    cost_cell: "",
    measure: "",
    name: "",
    need_to_buy: ""
  };

  updateCost(event: any) {
    let value = event.target.value;
    this.shoppingListService.updateCost(value, this.item.cost_cell).subscribe(res => {
      console.log(res);
      this.isEditting = false;
      this.refresh.emit();
    });
  }

  editCost() {
    this.isEditting = true;
  }

}
