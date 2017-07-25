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

  it('select ticket price data from the substore', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const selectorStub = mockSubStore.getSelectorStub('ticketPrice');
    selectorStub.next(2);
    selectorStub.complete();

    cellComponent.ticketPrice$
      .subscribe(
        ticketPrice => expect(ticketPrice).toEqual(2));
  }));

  it('select ticket quantity data from the substore', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const selectorStub = mockSubStore.getSelectorStub('tickets');
    selectorStub.next(4);
    selectorStub.complete();

    cellComponent.numTickets$
      .subscribe(
        numTickets => expect(numTickets).toEqual(4));
  }));

  it('should use reasonable defaults if ticket price is missing', async(() => {
    cellComponent.ticketPrice$
      .subscribe(
        ticketPrice => expect(ticketPrice).toEqual(0));
  }));

  it('should use reasonable defaults if ticket quantity is missing', async(() => {
    cellComponent.numTickets$
      .subscribe(
        numTickets => expect(numTickets).toEqual(0));
  }));

  it('should compute the subtotal as the ticket quantity changes', async(() => {
    const mockSubStore = MockNgRedux.getSubStore(
      ['WALLABIES', 'items', 'id1']);

    const priceStub = mockSubStore.getSelectorStub('ticketPrice');
    priceStub.next(1);
    priceStub.next(2);
    priceStub.next(3);
    priceStub.complete();

    const quantityStub = mockSubStore.getSelectorStub('tickets');
    quantityStub.next(5);
    quantityStub.complete();

    cellComponent.subTotal$
      .toArray()
      .subscribe(
        subTotals => expect(subTotals).toEqual([5, 10, 15]));
  }));
});
