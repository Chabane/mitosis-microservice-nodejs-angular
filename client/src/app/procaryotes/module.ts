import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcaryotePageComponent } from './page';
import { CellModule } from '../cells/module';
import { CoreModule } from '../core/module';
import { StoreModule } from '../store/module';

@NgModule({
  declarations: [ProcaryotePageComponent],
  exports: [ProcaryotePageComponent],
  imports: [CellModule, CoreModule, StoreModule, CommonModule],
})
export class ProcaryoteModule {}
