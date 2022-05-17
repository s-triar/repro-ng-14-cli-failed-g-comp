import { CurrencyPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { POSCashierContainerItem, POSCashierItem } from '../../domain/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private re = new RegExp('^[0-9]+(\.{0,1}[0-9]+)$');
  private re2 = new RegExp('^\-{0,1}[0-9]+(\.{0,1}[0-9]+)$');
  // private cp = this.curPipe('en-US');

  constructor(private cp: CurrencyPipe) { }


    public camelize(text: string): string {
      text = text.toUpperCase();
      return text.substring(0, 1) + text.substring(1).toLowerCase();
    }

    public convertModelToFormData(model: any, parentKey: string|null, carryFormData: FormData|null): FormData {
        const formData = carryFormData || new FormData();
        let index = 0;
        for (const key in model) {
            if (Object.prototype.hasOwnProperty.call(model, key)) {
                if (model[key] !== null && model[key] !== undefined){
                    let propName = parentKey || key;
                    if (parentKey && this.isObject(model)){
                        propName = parentKey + '.' + key;
                    }
                    if (parentKey && this.isArray(model)) {
                        propName = parentKey + '[' + index + ']';
                    }
                    if (model[key] instanceof File) {
                        formData.append(propName, model[key]);
                    }
                    else if (model[key] instanceof FileList) {
                        for (let j = 0; j < model[key].length; j++) {
                            formData.append(propName + '[' + j + ']', model[key].item(j));
                        }
                    }
                    else if (this.isArray(model[key]) || this.isObject(model[key])) {
                        this.convertModelToFormData(model[key], propName, formData);
                    }
                    else if (typeof model[key] === 'boolean') {
                        formData.append(propName, +model[key] ? '1' : '0');
                    }
                    else{
                        const element = model[key];
                        formData.append(propName, element);
                    }
                }

                index++;
            }
        }
        return formData;
    }
    private isArray(val: any): boolean {
        const toString = ({}).toString;
        return toString.call(val) === '[object Array]';
    }

    private isObject(val: any): boolean {
        return !this.isArray(val) && typeof val === 'object' && !!val;
    }
    public ConvertBase64ToFile(dataBase64: string, filename: string, type: string, pureBase64: boolean = false): File{
        const blb = this.dataURItoBlob(dataBase64, type, pureBase64);
        const f: File = new File([blb], filename, {type, endings: 'native'});
        return f;
    }

    public dataURItoBlob(dataURI: string, type: string, pureBase64: boolean = false): Blob {
        const data = pureBase64 ? dataURI : dataURI.split('base64,')[1];
        const byteString = atob(data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const cf: BlobPropertyBag = {
          endings: 'native',
          type
        };
        const blob = new Blob([ab], cf); // or mimeString if you want
        return blob;
    }
   convertModelToHttpParams(obj: any): HttpParams {
        return this.addToHttpParams(new HttpParams(), obj, null);
      }

      private addToHttpParams(params: HttpParams, obj: any, prefix: string|null): HttpParams {
        for (const p in obj) {
          if (obj.hasOwnProperty(p)) {
            let k = p;
            if (prefix) {
              if (p.match(/^-{0,1}\d+$/)) {
                k = prefix + '[' + p + ']';
              } else {
                k = prefix + '.' + p;
              }
            }
            const v = obj[p];
            if (v !== null && typeof v === 'object' && !(v instanceof Date)) {
              params = this.addToHttpParams(params, v, k);
            } else if (v !== undefined) {
              if (v instanceof Date) {
                params = params.set(k, (v as Date).toISOString()); // serialize date as you want
              }
              else {
                params = params.set(k, v);
              }

            }
          }
        }
        return params;
      }

    // tslint:disable-next-line:max-line-length
    public formatCurrency(event: Event, dataUsed: POSCashierContainerItem|POSCashierItem, varActual: string, varFormatted: string): void{
      const actual = Object.getOwnPropertyDescriptor(dataUsed, varActual);
      const formatted = Object.getOwnPropertyDescriptor(dataUsed, varFormatted);
      const p = (event.target as HTMLInputElement);
      if (p !== undefined && p !== null && actual && formatted){
        let occPoint = 0;
        const secondPoint = formatted.value.replace(/\./g, (match: string) => {occPoint += 1; return occPoint === 2 ? '' : match; });
        formatted.value = secondPoint;
        let pNoComma = p.value.replace(/\,/g, '');
        if (pNoComma === ''){
          pNoComma = '0';
        }
        if (!this.re.test(pNoComma) && !this.re2.test(pNoComma)){
          if (formatted?.value !== null){
            p.value = formatted?.value ;
          }else{
            p.value = '0';
          }
          return;
        }
        if (pNoComma === '-'){
          pNoComma = '';
        }

        actual.value = parseFloat((pNoComma === '' ? '0' : pNoComma));


        formatted.value = this.cp.transform(pNoComma, ' ', 'symbol', '0.0-3' );
        if (formatted?.value !== null){
          formatted.value = formatted?.value.replace(' ', '');
        }
        if (pNoComma.charAt(0) === '-' && formatted?.value?.charAt(0) !== '-'){
          formatted.value = '-' + formatted?.value?.trim();
        }
        if (actual?.value === 0){
          p.value = '0';
        }
        if (formatted?.value !== null  ){
          p.value = formatted?.value;
        }
        Object.assign(dataUsed, {[varFormatted]: formatted?.value, [varActual]: actual?.value});

      }
    }

    public formatCurrencyReactiveForm(val: string, form: FormGroup, varActual: string, varFormatted: string): string{
      const actual = form.get(varActual) as FormControl;
      const formatted = form.get(varFormatted) as FormControl;
      let occPoint = 0;
      const secondPoint = formatted.value.replace(/\./g, (match: string) => {occPoint += 1; return occPoint === 2 ? '' : match; });
      formatted.setValue(secondPoint);
      let pNoComma = val.replace(/\,/g, '');
      if (pNoComma === ''){
        pNoComma = '0';
      }
      if (!this.re.test(pNoComma) && !this.re2.test(pNoComma)){
        if (formatted.value !== null){
          val = formatted.value ;
        }else{
          val = '0';
        }
        return val;
      }
      if (pNoComma === '-'){
        pNoComma = '';
      }
      actual.setValue(parseFloat((pNoComma === '' ? '0' : pNoComma)));

      formatted.setValue(this.cp.transform(pNoComma, ' ', 'symbol', '0.0-3' ));
      if (formatted.value !== null){
        formatted.setValue(formatted.value.replace(' ', ''));
      }
      if (pNoComma.charAt(0) === '-' && formatted.value.charAt(0) !== '-'){
        formatted.setValue('-' + formatted.value.trim());
      }
      if (actual.value === 0){
        val = '0';
      }
      if (formatted.value !== null){
        val = formatted.value;
      }
      return val;
    }

    public formatCurrencyReactiveFormFromEvent(event: Event, form: FormGroup, varActual: string, varFormatted: string): void{
      const p = (event.target as HTMLInputElement);
      if (p !== undefined && p !== null){
        p.value = this.formatCurrencyReactiveForm(p.value, form, varActual, varFormatted);
      }
    }
}
