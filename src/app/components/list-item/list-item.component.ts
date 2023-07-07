import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingrediente } from 'src/app/interfaces/ingrediente.interface';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit{
  public isEditting = false;
  public checked = false;
  @Output('refresh') public refresh: EventEmitter<void> = new EventEmitter();
  constructor(private shoppingListService: ShoppingListService) {
  }

  @Input('item') public item: Ingrediente = {
    cost: "",
    cost_cell: "",
    measure: "",
    name: "",
    need_to_buy: "",
    sheet_name: ""
  };

  ngOnInit(): void {
    this.checked = sessionStorage.getItem(this.item.name) === "true" ? true : false;
  }

  updateCost(event: any) {
    let value = event.target.value;
    this.shoppingListService.updateCost(value, this.item.cost_cell, this.item.sheet_name).subscribe(res => {
      this.isEditting = false;
      this.refresh.emit();
    });
  }

  editCost() {
    this.isEditting = true;
    this.checked = this.checked === true ? true : false;
  }

  check(e: any) {
    let isChecked = e.target.checked;
    let id = e.target.id;
    this.checked = isChecked;
    sessionStorage.setItem(id, isChecked);
  }

}
