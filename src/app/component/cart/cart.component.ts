import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartDataStore } from 'src/app/store/cart.store';
import { Cart } from 'src/app/model/cart';
import * as moment from 'moment/moment';
import { OrderDataStore } from 'src/app/store/order.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cartList: Cart[]

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartDataStore: CartDataStore,
    private orderDataStore: OrderDataStore
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    const uid = this.auth.currentUserId()
    this.cartDataStore.whereByUserId(uid).subscribe(docs => {
      this.cartList = docs.filter(v => { return !v.is_order })
    })
  }

  deleteCart(id: string) {
    this.cartDataStore.delete(id).then(isRes => {
      if(isRes) {
        this.fetch()
      }
    });
  }

  addOrder() {

    if (this.cartList.length == 0) return;
    const lastIndex = this.cartList.length - 1
    this.cartList.forEach((v, i) => {
      this.cartDataStore.update(v.id).then(isRes => {
        if (isRes) {
          const timestamp = moment().unix()*1000;
          const uid = this.auth.currentUserId()

          const params = {
            'user_id': uid,
            'order_name': v.menu_name,
            'price': v.price,
            'size': v.size,
            'created_at': timestamp,
            'updated_at': timestamp,
            'is_paid': false,
            'is_make': false,
            'is_complete': false,
            'is_cancel': false,
            'order_month': moment().format('YYYYMM'),
            'order_date': moment().format('YYYYMMDD'),
            'order_time': moment().format('YYYYMMDDHHmm'),
            'menu_id': v.menu_id,
            'shop_id': v.shop_id
          }

          this.orderDataStore.add(params).then(isRes => {
            if (isRes && i == lastIndex) {
              this.router.navigate(['/order'])
            }
          });
        }
      });
    });
  }

}
