import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Location } from '@angular/common';

@Component({
  selector: 'app-order-qrcode',
  templateUrl: './order-qrcode.component.html',
  styleUrls: ['./order-qrcode.component.sass']
})
export class OrderQrcodeComponent implements OnInit {

  orderId: string = "";

  constructor(
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router
    // private location: Location
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(object =>  {
      this.orderId = object['id'] as string;
    });
  }

  toBackPage() {
    this.router.navigate(['/order'])
  }

}
