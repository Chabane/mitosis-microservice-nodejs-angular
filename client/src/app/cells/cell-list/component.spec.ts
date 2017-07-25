import { Component, Input } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CellListComponent } from './component';
import { CoreModule } from '../../core/module';
import { CellType } from '../model';

@Component({ selector: 'mi-cell', template: '' })
class MockCellComponent {
  @Input() key: string
  @Input() cellType: CellType
}

describe('CellListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CellListComponent, MockCellComponent],
      imports: [CoreModule],
    }).compileComponents();
  }));

  it(`should have as title 'Welcome to the Mitosis'`, async(() => {
    const fixture = TestBed.createComponent(CellListComponent);
    const cellList = fixture.debugElement.componentInstance;

    cellList.cellsName = 'Wallabies';
    cellList.cellType = 'WALLABIES';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement.nativeElement.textContent).toContain('We have Wallabies');
  }));
});
