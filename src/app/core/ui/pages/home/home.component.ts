import { Component, OnInit } from '@angular/core';
import { GoodsTypeService } from 'src/app/core/infrastructure/backend/goods-type.service';
import { MainNavbarTopComponent } from '../../components/nav-top/main-navbar-top.component';

@Component({
  standalone:true,
  imports:[MainNavbarTopComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  title = 'berdikari';
  constructor(
    private t: GoodsTypeService
  ){}
  ngOnInit(): void {
    this.t.getAll();
  }
}
