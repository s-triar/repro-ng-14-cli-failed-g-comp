import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { goodsTypes_Root } from '../data';
import { GoodsTypeDto } from '../../domain/types/Dtos';
import { GoodsTypeAPI } from '../../application/values/apis';
import { AppToken, APP_TOKEN } from '../../application/values/app-token';
import { ApiCallService } from './ApiCall.service';
import { environment } from 'src/environments/environment';
import { GoodsTypeMockService } from 'src/app/mock/backend-mock/goods-type-mock.service';


export interface GoodsTypeServiceInterface{
  getAll(): Observable<GoodsTypeDto[]>;
  getAll_Tree(): Observable<GoodsTypeDto[]>;
}


@Injectable({
  providedIn:'root',
})
export class GoodsTypeService implements GoodsTypeServiceInterface{
  GoodsTypes$: BehaviorSubject<GoodsTypeDto[]> = new BehaviorSubject<GoodsTypeDto[]>([]);
  constructor(private http: HttpClient) {
    // this.GoodsTypes$ = this.getAll();
    this.getAll().subscribe(x => this.GoodsTypes$.next(x));
  }
  getAll(): Observable<GoodsTypeDto[]> {
    return this.http.get<GoodsTypeDto[]>(GoodsTypeAPI.All);
  }

  getAll_Tree(): Observable<GoodsTypeDto[]>{
    let params = new HttpParams();
    params = params.append('OnlyRoot', 'true');
    return this.http.get<GoodsTypeDto[]>(GoodsTypeAPI.All, {params});
  }
}



export const GoodsTypeServiceProvider =
  { provide: GoodsTypeService,
    useFactory: (http: HttpClient)=>{
      return environment.production ? new GoodsTypeService(http): new GoodsTypeMockService()
    },
    deps:[HttpClient]
  };
