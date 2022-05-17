import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GoodsTypeDto } from 'src/app/core/domain/types/Dtos';
import { GoodsTypeServiceInterface } from 'src/app/core/infrastructure/backend/goods-type.service';

@Injectable({providedIn:'root'})
export class GoodsTypeMockService implements GoodsTypeServiceInterface{
  constructor() {
    console.log("dd")
  }
  getAll(): Observable<GoodsTypeDto[]> {
    console.log("hihihi")
    return of([]);
  }
  getAll_Tree(): Observable<GoodsTypeDto[]> {
    throw new Error('Method not implemented.');
  }

  
}
