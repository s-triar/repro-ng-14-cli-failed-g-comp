import { Component, OnInit } from '@angular/core';
import { GoodsTypeService } from 'src/app/core/infrastructure/backend/goods-type.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

@Component({
  standalone:true,
  imports: [
    FontAwesomeModule
  ],
  selector: 'br-main-navbar-top',
  templateUrl: './main-navbar-top.component.html',
  styleUrls: ['./main-navbar-top.component.scss'],
})
export class MainNavbarTopComponent implements OnInit{
  title = 'berdikari';
  icons={
    search: faMagnifyingGlass
  }
  constructor(
    private t: GoodsTypeService
  ){}
  ngOnInit(): void {
    this.t.getAll();
  }
}
