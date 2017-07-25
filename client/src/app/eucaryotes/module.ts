import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EucaryotePageComponent } from './page';
import { CellModule } from '../cells/module';
import { CoreModule } from '../core/module';
import { StoreModule } from '../store/module';

@NgModule({
  declarations: [EucaryotePageComponent],
  exports: [EucaryotePageComponent],
  imports: [CellModule, CoreModule, StoreModule, CommonModule],
})
export class EucaryoteModule {}
