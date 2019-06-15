import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.sass']
})
export class TopComponent implements OnInit {

  cols: string = "1"

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.judgeDevice()
  }

  judgeDevice() {
    if(this.deviceService.isMobile()) {
      this.cols = "1"
    } else {
      this.cols = "3"
    }
  }

  toLogin() {
    //this.router.navigate(['/login'])
    this.router.navigate(['/comingsoon'])
  }

  toSignup() {
    //this.router.navigate(['/signup'])
    this.router.navigate(['/comingsoon'])
  }
}
