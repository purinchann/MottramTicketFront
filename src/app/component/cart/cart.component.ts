import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartDataStore } from 'src/app/store/cart.store';
import { Cart } from 'src/app/model/cart';
import * as moment from 'moment/moment';
import { OrderDataStore } from 'src/app/store/order.store';
import { Router } from '@angular/router';
import { ShopDataStore } from 'src/app/store/shop.store';
import { Shop } from 'src/app/model/shop';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cartList: Cart[]
  shop: Shop;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartDataStore: CartDataStore,
    private orderDataStore: OrderDataStore,
    private shopDataStore: ShopDataStore
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    const uid = this.auth.currentUserId()
    this.cartDataStore.whereByUserId(uid).subscribe(docs => {
      this.cartList = docs.filter(v => { return !v.is_order })
    })

    this.shopDataStore.findById("Bhgou5g11hYztxeX2JFz").subscribe(doc => {
      this.shop = doc
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

    if (this.cartList.length == 0) {
      confirm('カートに商品がありません')
      return;
    }

    if (!this.isInBusinessHours()) {
      const businessHours = this.shop.business_hours
      const businessHoursArray = businessHours.split('〜')
      let start = businessHoursArray[0]
      let end = businessHoursArray[1]
      confirm(`本日、注文を受け付けている時間帯は${start}〜${end}までです`)
      return;
    }

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
            'shop_id': v.shop_id,
            'paid_user_id': '',
            'buyer_id': '',
            'delivered_user_id': '',
            'image_url': v.image_url
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

  isInBusinessHours(): boolean {
        
      let nowStr = moment().format("HH:mm:ss")
      const businessHours = this.shop.business_hours
      const businessHoursArray = businessHours.split('〜')
      let start = businessHoursArray[0] + ':00'
      let end = businessHoursArray[1] + ':00'
      // let start = "11:00:00"
      // let end = "17:00:00"
      if (start <= nowStr && nowStr <= end) {
          return true
      } else {
          return false
      }
  }

  totalItemPrice(): number {

    var itemPrice: number = 0;
    this.cartList.forEach(v => {
      itemPrice += v.price
    })
    return itemPrice
  }

  totalFee(): number {
    return this.cartList.length * 500
  }

}
