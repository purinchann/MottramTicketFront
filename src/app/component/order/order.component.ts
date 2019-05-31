import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { OrderDataStore } from 'src/app/store/order.store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  noPaidOrderList: Order[];
  makingOrderList: Order[];
  waitDeliveryOrderList: Order[];
  historyOrder: Order[];

  constructor(
    private router: Router,
    private auth: AuthService,
    private orderDataStore: OrderDataStore
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    const uid = this.auth.currentUserId()
    this.orderDataStore.whereByUserId(uid).subscribe(docs => {

      this.noPaidOrderList = docs.filter(v => { return !v.is_paid && !v.is_make && !v.is_complete && !v.is_cancel });
      this.makingOrderList = docs.filter(v => { return v.is_paid && !v.is_make && !v.is_complete && !v.is_cancel });
      this.waitDeliveryOrderList = docs.filter(v => { return v.is_paid && v.is_make && !v.is_complete && !v.is_cancel });
      this.historyOrder = docs.filter(v => { return v.is_paid && v.is_make && v.is_complete && !v.is_cancel });
    });
  }

  showQRCode(orderId: string) {
    //QR Code Created
  }

  doCancelEvent(orderId: string) {
    this.orderDataStore.update(orderId, {'is_cancel': true}).then(isRes => {
      if (isRes) {
        this.fetch()
      }
    });
  }
}
