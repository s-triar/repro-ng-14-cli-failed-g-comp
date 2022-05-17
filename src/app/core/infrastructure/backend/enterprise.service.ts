import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { showErrorDialogContext } from '../../application/interceptors/notification.interceptor';
import { EnterpriseTokenDto, MyEnterpriseDto } from '../../domain/types/Dtos';
import { CheckAvailableEnterpriseCodeQuery, EnterpriseTokenQuery, GetAvailableEnterpriseCodeQuery, GetMyEnterprisesQuery } from '../../domain/types/Queries';
import { EnterpriseAPI } from '../../application/values/apis';
import { ApiCallService } from './ApiCall.service';
import { UtilityService } from './utility.service';

export interface EnterpriseServiceInterface{
  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>;
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseDto[]>;
  create(data: FormData): Observable<string>;
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]>;
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenDto>;
}

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService extends ApiCallService implements EnterpriseServiceInterface{

  constructor(protected http: HttpClient, private utilService: UtilityService) {
    super(http);
  }
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]> {
    return this.http.get<string[]>(EnterpriseAPI.GetAvailableEnterpriseCode, {params:  query });
  }

  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>{
    return this.http.get<boolean>(EnterpriseAPI.CheckAvailableEnterpriseCode, {params:  query });
  }
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseDto[]>{
    return this.http.get<MyEnterpriseDto[]>(EnterpriseAPI.GetOwned, {params:  query });
  }
  create(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.http.post<string>(EnterpriseAPI.Create, data, {context: showErrorDialogContext()});
  }
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenDto>{
    return this.http.get<EnterpriseTokenDto>(EnterpriseAPI.GetEnterpriseToken, {params: query});
  }

}
