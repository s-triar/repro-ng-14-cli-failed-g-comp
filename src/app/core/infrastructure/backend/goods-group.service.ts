import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { showErrorDialogContext } from '../../application/interceptors/notification.interceptor';
import { MyGoodsGroupsListContainerDto, MyGoodsGroupsListItemDto, SearchPageResponse } from '../../domain/types/Dtos';
import { CheckDuplicateGoodsGroupNameQuery, GetMyGoodsGroupsSearchQuery, SearchPageRequest } from '../../domain/types/Queries';
import { GoodsGroupAPI } from '../../application/values/apis';
import { ApiCallService } from './ApiCall.service';
import { UtilityService } from './utility.service';

export interface GoodsGroupServiceInterface{
  checkDuplicateBarcode(query: CheckDuplicateGoodsGroupNameQuery): Observable<boolean>;
  getMyGoodsGroup(query: GetMyGoodsGroupsSearchQuery): Observable<MyGoodsGroupsListContainerDto>;
  create(form: any): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class GoodsGroupService extends ApiCallService implements GoodsGroupServiceInterface{

  constructor(private httpClient: HttpClient, private utilService: UtilityService) {
    super(httpClient);
  }
  checkDuplicateBarcode(query: CheckDuplicateGoodsGroupNameQuery): Observable<boolean> {
    return this.httpClient.get<boolean>(GoodsGroupAPI.CheckDuplicateGoodsGroupName, {params: query});
  }

  getMyGoodsGroup(query: SearchPageRequest): Observable<MyGoodsGroupsListContainerDto> {
    return this.httpClient.get<MyGoodsGroupsListContainerDto>(GoodsGroupAPI.GetMyGoodsGroup, {params: query});
  }
  create(form: any): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(GoodsGroupAPI.Create, data, {context: showErrorDialogContext()});
  }
}
