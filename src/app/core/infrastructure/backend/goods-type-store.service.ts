import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoodsTypeService } from '../../core/infrastructure/services/goods-type.service';
import { GoodsTypeDto } from '../types/Dtos';

@Injectable({
  providedIn: 'root'
})
export class GoodsTypeStoreService {
  goodTypes = new BehaviorSubject<GoodsTypeDto[]>([]);
  goodTypes$ = this.goodTypes.asObservable();
  constructor(private goodsTypeService: GoodsTypeService) {
    if (this.goodTypes.getValue().length === 0){
      this.goodsTypeService.getAll().subscribe(
        res => this.goodTypes.next(res)
      );
    }
  }
}
