import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { CommonMaterialModule } from '../common-material/common-material.module';

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodosRoutingModule, CommonMaterialModule],
})
export class TodosModule {}
