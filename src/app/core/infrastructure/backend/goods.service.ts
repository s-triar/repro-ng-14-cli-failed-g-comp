import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { showErrorDialogContext } from '../../application/interceptors/notification.interceptor';
import {
  AddStockCommand,
  AdjustStockCommand,
  UpdateGoodsSellingPriceCommand
} from '../../domain/types/Commands';
import {
  InfoOfGoodsForUpdatingDto,
  MyGoodsesDto,
  MyGoodsesListContainerDto,
  MyGoodsRelationDto
} from '../../domain/types/Dtos';
import {
  CheckDuplicateBarcodeInAnEnterpriseQuery,
  GetInfoOfGoodsForUpdatingQuery,
  GetMyGoodsesSearchQuery,
  GetMyGoodsesRelationQuery
} from '../../domain/types/Queries';
import { GoodsAPI } from '../../application/values/apis';
import { ApiCallService } from './ApiCall.service';
import { UtilityService } from './utility.service';
export interface GoodsServiceInterface{
  getMyGoodses(query: GetMyGoodsesSearchQuery): Observable<MyGoodsesListContainerDto>;
  getMyGoodsesRelation(query: GetMyGoodsesRelationQuery): Observable<MyGoodsRelationDto[]>;
  checkDuplicateBarcode(query: CheckDuplicateBarcodeInAnEnterpriseQuery): Observable<boolean>;
  create(form: any): Observable<string>;
  update(form: any): Observable<string>;
  addStock(data: AddStockCommand): Observable<string>;
  adjustStock(data: AdjustStockCommand): Observable<string>;
  changeSellPrice(data: UpdateGoodsSellingPriceCommand): Observable<string>;
  getInfoGoodsForUpdate(query: GetInfoOfGoodsForUpdatingQuery): Observable<InfoOfGoodsForUpdatingDto>;
}
@Injectable({
  providedIn: 'root'
})
export class GoodsService extends ApiCallService implements GoodsServiceInterface {

  constructor(private httpClient: HttpClient, private utilService: UtilityService) {
    super(httpClient);
  }
  getMyGoodses(query: GetMyGoodsesSearchQuery): Observable<MyGoodsesListContainerDto>{
    return this.httpClient.get<MyGoodsesListContainerDto>(GoodsAPI.GetMyGoodses, {params: query});
  }
  getMyGoodsesRelation(query: GetMyGoodsesRelationQuery): Observable<MyGoodsRelationDto[]>{
    const param = this.utilService.convertModelToHttpParams(query);
    return this.httpClient.get<MyGoodsRelationDto[]>(GoodsAPI.GetMyGoodsesRelation, {params: param});
  }
  checkDuplicateBarcode(query: CheckDuplicateBarcodeInAnEnterpriseQuery): Observable<boolean>{
    return this.httpClient.get<boolean>(GoodsAPI.CheckDuplicateBarcode, {params: query});
  }
  create(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(GoodsAPI.Create, data, {context: showErrorDialogContext()});
  }
  updateInfo(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.UpdateInfo, data, {context: showErrorDialogContext()});
  }
  addItem(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(GoodsAPI.AddItem, data, {context: showErrorDialogContext()});
  }
  update(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.Update, data, {context: showErrorDialogContext()});
  }


  addStock(data: AddStockCommand): Observable<string>{
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.AddStock, data, {context: showErrorDialogContext()});
  }
  adjustStock(data: AdjustStockCommand): Observable<string>{
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.AdjustStock, data, {context: showErrorDialogContext()});
  }
  changeSellPrice(data: UpdateGoodsSellingPriceCommand): Observable<string>{
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.UpdateSellingPrice, data, {context: showErrorDialogContext()});
  }
  getInfoGoodsForUpdate(query: GetInfoOfGoodsForUpdatingQuery): Observable<InfoOfGoodsForUpdatingDto> {
    return this.httpClient.get<InfoOfGoodsForUpdatingDto>(GoodsAPI.GetInfoOfGoodsForUpdating, {params: query});
  }
}
