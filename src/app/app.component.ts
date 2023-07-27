import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { EmployeeServiceService } from './services/employee-service.service';
import { ApiResponse } from './models/ApiResponse';
import { Employee } from './models/Employee';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'amarisApp';
  _employees:Employee[]=[];

  public _ctEmployeeId = new FormControl('');

  displayedColumns: string[] = ['employee_name', 'employee_age','employee_salary',  'employee_anual_salary'];
  dataSource :any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public constructor(public _svc:EmployeeServiceService, public _toast:ToastrService) {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public Find(){
    /* validar si el campo esta en blanco */
    
    let _employeeId :number=Number(this._ctEmployeeId.value);
    /* */
    if(_employeeId==undefined || _employeeId==null || _employeeId==0)
    {
      this._svc.GetAllEmployees().then((result:ApiResponse)=>{
        if (result.ok){
          this._employees=result.content;
          
          this.dataSource= new MatTableDataSource<Employee>(this._employees);
          this._toast.success("Registros encontrados");
        }else{
          this._toast.error(result.message);
        }
    
      });
    }
    else{
      this._employees =[];
      this._svc.GetEmployeeById(_employeeId).then((result:any)=>{
        if (result.ok){

          this._employees.push(result.content);
          this.dataSource= new MatTableDataSource<Employee>(this._employees);
          this._toast.success("Registros encontrados");
        }else{
          this._toast.error(result.message);
        }
    
      }).catch(err=>{
        this._toast.error(err.message);
      });
    }
  }
}

