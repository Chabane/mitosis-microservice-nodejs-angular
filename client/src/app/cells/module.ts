import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/module';
import { CellListComponent } from './cell-list/component';
import { CellAPIActions } from './api/actions';
import { CellAPIEpics } from './api/epics';
import { CellAPIService } from './api/service';
import { StoreModule } from '../store/module';

import { CellComponent } from './cell/component';

@NgModule({
  declarations: [CellListComponent, CellComponent],
  exports: [CellListComponent],
  imports: [CoreModule, StoreModule, CommonModule],
  providers: [CellAPIActions, CellAPIEpics, CellAPIService],
})
export class CellModule {}
