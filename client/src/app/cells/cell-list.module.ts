import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { CellListComponent } from './cell-list.component';
import { CellService } from './cell.service';
import { cellListRoutes } from './cell-list.routes';

@NgModule({
  declarations: [ CellListComponent ],
  exports: [ CellListComponent, MdTableModule ],
  imports: [ CommonModule,
      MdTableModule,
      CdkTableModule,
      RouterModule.forChild(cellListRoutes)
  ],
  providers: [
    CellService
  ]
})
export class CellListModule { }
