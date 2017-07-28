import { async, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { CellComponent } from './component';
import { CoreModule } from '../../core/module';
import 'rxjs/add/operator/toArray';

describe('CellComponent', () => {
  let fixture;
  let cellComponent;
  let spyConfigureSubStore;

  beforeEach(async(() => {
    spyConfigureSubStore = spyOn(MockNgRedux.mockInstance, 'configureSubStore')
      .and.callThrough();

    MockNgRedux.reset();
    TestBed.configureTestingModule({
      declarations: [CellComponent],
      imports: [CoreModule, NgReduxTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    cellComponent = fixture.debugElement.componentInstance;

    cellComponent.key = 'id1';
    cellComponent.cellType = 'WALLABIES';

    fixture.detectChanges();
  }));

  it('should use the key to create a subStore', () =>
    expect(spyConfigureSubStore).toHaveBeenCalledWith(
      ['WALLABIES', 'items', 'id1'],
      jasmine.any(Function)));

  it('select name data from the substore', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const selectorStub = mockSubStore.getSelectorStub('name');
    selectorStub.next('Wilbert');
    selectorStub.complete();

    cellComponent.name$
      .subscribe(
        name => expect(name).toEqual('Wilbert'));
  }));

  it('select size price data from the substore', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const selectorStub = mockSubStore.getSelectorStub('color');
    selectorStub.next(2);
    selectorStub.complete();

    cellComponent.color$
      .subscribe(
        color => expect(color).toEqual(2));
  }));

  it('select size quantity data from the substore', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const selectorStub = mockSubStore.getSelectorStub('size');
    selectorStub.next(4);
    selectorStub.complete();

    cellComponent.numSizes$
      .subscribe(
        numSizes => expect(numSizes).toEqual(4));
  }));

  it('should use reasonable defaults if size price is missing', async(() => {
    cellComponent.color$
      .subscribe(
        color => expect(color).toEqual(0));
  }));

  it('should use reasonable defaults if size quantity is missing', async(() => {
    cellComponent.numSizes$
      .subscribe(
        numSizes => expect(numSizes).toEqual(0));
  }));

  it('should compute the subtotal as the size quantity changes', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const priceStub = mockSubStore.getSelectorStub('color');
    priceStub.next(1);
    priceStub.next(2);
    priceStub.next(3);
    priceStub.complete();

    const quantityStub = mockSubStore.getSelectorStub('size');
    quantityStub.next(5);
    quantityStub.complete();

    cellComponent.subTotal$
      .toArray()
      .subscribe(
        subTotals => expect(subTotals).toEqual([5, 10, 15]));
  }));
});
