import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  _url:string ='http://localhost:4694/api/Employees';
  constructor(private _client:HttpClient) { 

  }

  public GetEmployeeById (id:number):Promise<any>{
      let _newUrl = `${this._url}/GetById?id=${id}`;
      return this._client.get(_newUrl).toPromise();
  }

  public GetAllEmployees ():Promise<any>{
    let _newUrl = `${this._url}`;
      return this._client.get(_newUrl).toPromise();
  }
}
