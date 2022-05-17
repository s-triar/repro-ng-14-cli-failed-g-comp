import { Component, OnInit } from '@angular/core';
import { GoodsTypeService } from './core/infrastructure/backend/goods-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'berdikari';
  constructor(
    private t: GoodsTypeService
  ){}
  ngOnInit(): void {
    this.t.getAll();
  }
}
