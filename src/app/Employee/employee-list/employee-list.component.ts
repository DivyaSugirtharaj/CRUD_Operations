import { Component } from '@angular/core';
import { Employee } from '../Employee_interface';
import { SharedService } from '../Shared.service';
import { Employeeservice } from '../Employee.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  EmployeeList : Employee[] = [];
  displayedColumns: string[] = ['SNo' , 'FirstName' ,'LastName','Gender','EmailId','MobileNo','Country','State','City','Edit','Delete'];
  dataSource : any;

  constructor(public SharedService: SharedService, public Employeeservice : Employeeservice){
    
  }

  ngOnInit(){
    this.getEmployeeList();
    this.SharedService.EmployeeeAddState$.subscribe(res=>{
      this.EmployeeList = res;
      this.dataSource =  new MatTableDataSource(this.EmployeeList);
    })
    this.SharedService.updateEmployeeeDetails$.subscribe(res=>{
      let index = this.EmployeeList?.findIndex(x=>x.id == res.id);
      this.EmployeeList[index] = res;
    })
  }

  getEmployeeList(){
    this.EmployeeList = [];
    this.Employeeservice.GetAllEmployee()
    .subscribe(res=>{
      if(res && res.length > 0){
        res.forEach(row=>{
          this.EmployeeList.push(row);
        })
        this.dataSource =  new MatTableDataSource(this.EmployeeList);
      }
    })
  }

  onEdit(Employee : Employee){
    this.SharedService.EditEmployeeDetailsObs(Employee);
  } 

  onDelete(Employee : Employee){
    this.EmployeeList = [];
    this.Employeeservice.DeleteEmployee(Employee.id)
    .subscribe(res=>{
      if(res && res.length > 0){
        res.forEach(row=>{
          this.EmployeeList.push(row);
        })
        this.dataSource =  new MatTableDataSource(this.EmployeeList);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
