import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQrcodeComponent } from './order-qrcode.component';

describe('OrderQrcodeComponent', () => {
  let component: OrderQrcodeComponent;
  let fixture: ComponentFixture<OrderQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
