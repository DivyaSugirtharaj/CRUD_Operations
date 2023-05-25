import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Employeeservice } from '../Employee.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../Shared.service';
import { Employee } from '../Employee_interface';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  EmployeeForm : FormGroup;
  isEdit: Boolean = false;
  msg:String = '';
  EmployeeData : Employee;
  ShowUpdateButton = false;
  constructor(private Employeeservice: Employeeservice, 
    public httpclient : HttpClient,
    public SharedService : SharedService){}
  
  ngOnInit(){
    this.EmployeeForm = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      EmailId: new FormControl(''),
      Gender : new FormControl(''), 
      Country : new FormControl(''),
      State : new FormControl(''),
      City : new FormControl(''),
      MobileNo : new FormControl('')
    })
    this.SharedService.EditEmployeeDetails$.subscribe(res=>{
      this.ShowUpdateButton = true;
      this.EmployeeData = res;
      this.EmployeeForm.patchValue({
        'FirstName' : res.FirstName,
        'LastName':  res.LastName,
        'EmailId':  res.EmailId,
        'Gender' : res.Gender,
        'Country' : res.Country,
        'State' : res.State,
        'City' : res.City,
        'MobileNo' : res.MobileNo
      })
    })
  }

  addEmployee(){
    if(this.EmployeeForm.valid){
      this.Employeeservice.CreateEmployee(this.EmployeeForm.value)
      .subscribe((res: any)=>{
        this.SharedService.assignEmployeeeDetails(res);
        this.EmployeeForm.reset();
      })
    }
  }

  UpdateEmployeeDetails(){
    if(this.EmployeeForm.valid){
      this.EmployeeData.FirstName = this.EmployeeForm.get('FirstName')?.value;
      this.EmployeeData.LastName = this.EmployeeForm.get('LastName')?.value;
      this.EmployeeData.Gender = this.EmployeeForm.get('Gender')?.value;
      this.EmployeeData.EmailId = this.EmployeeForm.get('EmailId')?.value;
      this.EmployeeData.MobileNo = this.EmployeeForm.get('MobileNo')?.value;
      this.EmployeeData.Country = this.EmployeeForm.get('Country')?.value;
      this.EmployeeData.State = this.EmployeeForm.get('State')?.value;
      this.EmployeeData.City = this.EmployeeForm.get('City')?.value;
      this.Employeeservice.UpdateEmployee(this.EmployeeData)
      .subscribe((res: any)=>{
        this.SharedService.updateEmployeeeDetailsObs(res);
        this.EmployeeForm.reset();
        this.ShowUpdateButton = false;
      })
    }
  }

  resetForm(){
    this.EmployeeForm.reset();
  }
  
}


