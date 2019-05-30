import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MenuDataStore } from 'src/app/store/menu.store';
import { ShopDataStore } from 'src/app/store/shop.store';
import { Menu } from 'src/app/model/menu';
import { Shop } from 'src/app/model/shop';
import * as moment from 'moment/moment';
import { CartDataStore } from 'src/app/store/cart.store';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  menus: Menu[];
  shop: Shop;
  selectedForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private menuDataStore: MenuDataStore,
    private shopDataStore: ShopDataStore,
    private cartDataStore: CartDataStore
  ) { 
    this.selectedForm = new FormGroup({
      size_and_price: new FormControl('')
    });
  }

  ngOnInit() {
    this.fetch()
  }

  fetch() {

    this.menuDataStore.findAll().subscribe(docs => {
      this.menus = docs
      .filter(v => {
        return v.handling_shop_number.split(",").includes("4")
      })
    })

    this.shopDataStore.findById("Bhgou5g11hYztxeX2JFz").subscribe(doc => {
      this.shop = doc
    })
  }

  sizeAndPrices(text: string): string[] {
    return text.split(',').map(v => {
      const size = `${v.slice(0)}サイズ`
      const price = `¥${v.slice(1)}`
      return `${size}/${price}`
    })
  }

  addCart(menu: Menu) {
    const timestamp = moment().unix()*1000;
    const uid = this.auth.currentUserId()

    const selectValue = this.selectedForm.get('size_and_price').value as string
    const size = selectValue.split('/')[0].replace('サイズ', '')
    const priceStr = selectValue.split('/')[1].replace('¥', '')
    const price = Number(priceStr)
    const params = {
      'user_id': uid,
      'menu_name': menu.name_jp,
      'price': price,
      'size': size,
      'created_at': timestamp,
      'menu_id': menu.id,
      'shop_id': this.shop.id,
    }
    this.cartDataStore.add(params).then(res => {
      if (res) {
        this.selectedForm.setValue({size_and_price: ''})
      }
    })
  }
}
