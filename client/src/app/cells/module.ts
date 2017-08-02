import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/module';
import { CellListComponent } from './cell-list/component';
import { GetCellsAPIActions } from './api/list/actions';
import { GetCellsAPIEpics } from './api/list/epics';
import { GetCellsAPIService } from './api/list/service';
import { SubscribeMoreCellsAPIActions } from './api/more/actions';
import { SubscribeMoreCellsAPIEpics } from './api/more/epics';
import { SubscribeMoreCellsAPIService } from './api/more/service';
import { StoreModule } from '../store/module';

import { CellComponent } from './cell/component';

@NgModule({
  declarations: [CellListComponent, CellComponent],
  exports: [CellListComponent],
  imports: [CoreModule, StoreModule, CommonModule],
  providers: [
    GetCellsAPIActions, GetCellsAPIEpics, GetCellsAPIService,
    SubscribeMoreCellsAPIActions, SubscribeMoreCellsAPIEpics, SubscribeMoreCellsAPIService
  ],
})
export class CellModule { }
