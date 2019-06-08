import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  lat: number = 33.585734;
  lng: number = 130.394709;

  constructor() { }

  ngOnInit() {
  }

}
