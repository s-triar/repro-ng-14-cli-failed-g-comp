import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
import { EnterpriseTokenService } from '../../infrastructure/backend/enterprise-token.service';

@Injectable()
export class EnterpriseInterceptor implements HttpInterceptor {

  constructor(
    private readonly enterpriseTokenService: EnterpriseTokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.enterpriseTokenService.getTokenAsString();
    // console.log(token, 'interceptor');
    if (!!token){
      req = req.clone({
        setHeaders: {
          'enterprise-authorization': `${token}`
        }
      });
    }
    return next.handle(req);
  }
}
