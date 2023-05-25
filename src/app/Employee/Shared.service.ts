import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Employee } from "./Employee_interface";

@Injectable()
export class SharedService{
  EmployeeeAddState = new Subject <any>();
  EditEmployeeDetails = new Subject <any>();
  updateEmployeeeDetails = new Subject <any>();
  EmployeeeAddState$ = this.EmployeeeAddState.asObservable();
  EditEmployeeDetails$ = this.EditEmployeeDetails.asObservable();
  updateEmployeeeDetails$ = this.updateEmployeeeDetails.asObservable();

  assignEmployeeeDetails(EmployeeData : Employee){
    this.EmployeeeAddState.next(EmployeeData)
  }

  EditEmployeeDetailsObs(EmployeeData:Employee){
    this.EditEmployeeDetails.next(EmployeeData)
  }

  updateEmployeeeDetailsObs(EmployeeData : Employee){
    this.EmployeeeAddState.next(EmployeeData)
  }
}