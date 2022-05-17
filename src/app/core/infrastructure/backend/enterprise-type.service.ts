import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnterpriseTypeDto } from '../../domain/types/Dtos';
import { EnterpriseTypeAPI } from '../../application/values/apis';
import { AppToken, APP_TOKEN } from '../../application/values/app-token';
import { ApiCallService } from './ApiCall.service';
export interface EnterpriseTypeServiceInterface{
  getAll(): Observable<EnterpriseTypeDto[]>;
}
@Injectable({
  providedIn: 'root',
})
export class EnterpriseTypeService extends ApiCallService implements EnterpriseTypeServiceInterface{

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getAll(): Observable<EnterpriseTypeDto[]>{
    return this.httpClient.get<EnterpriseTypeDto[]>(EnterpriseTypeAPI.All);
  }

}
