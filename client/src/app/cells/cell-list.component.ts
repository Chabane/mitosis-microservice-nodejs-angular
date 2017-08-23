import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { CellService } from './cell.service';
import { ICell } from './cell.model';

@Component({
  selector: 'mi-cell-list',
  templateUrl: './cell-list.component.html',
  styleUrls: ['./cell-list.component.css']
})
export class CellListComponent {
  displayedColumns = ['type', 'name'];
  dataSource: CellDataSource | null;
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<ICell[]> = new BehaviorSubject<ICell[]>([]);
  get data(): ICell[] { return this.dataChange.value; }

  ngOnInit() {
    this.cellService.getAll()
        .map((response: any) => response.data.cells)
        .subscribe(data => { 
          this.dataChange.next(data);
          this.dataSource = new CellDataSource(this.dataChange);
        });

    // subscribing to the kafka producer
    this.cellService.getNewCell().map((response: any) => {
      let cell = response.data.newCell;
      this.addCell(cell);
    });     
  }

  constructor(private cellService: CellService) {
    
  }

  addCell(cell: ICell) {
    const copiedData = this.data.slice();
    copiedData.push(cell);
    this.dataChange.next(copiedData);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class CellDataSource extends DataSource<ICell> {
  constructor(private dataChange: BehaviorSubject<ICell[]>) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ICell[]> {
    return this.dataChange;
  }

  disconnect() {}
}

