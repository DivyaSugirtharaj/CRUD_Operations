import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "./Employee_interface";
import { Observable, catchError, retry, throwError } from "rxjs";

@Injectable()
export class Employeeservice{
    apiURL = 'http://localhost:3000';
    constructor(private http: HttpClient) {}
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
    };
    // HttpClient API post() method => Create employee
    CreateEmployee(employee: any): Observable<Employee> {
        return this.http
        .post<Employee>(
            this.apiURL + '/addEmployeeDetails',employee,
            this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    UpdateEmployee(employee: any): Observable<Employee> {
        return this.http
        .put<Employee>(
            this.apiURL + '/updateEmployeeDetails/'+ employee.id, employee,
            this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }


    GetAllEmployee(){
        return this.http
        .get<Employee[]>(
            this.apiURL + '/getEmployeeList',
            this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    DeleteEmployee(id : number){
        return this.http
        .delete<Employee[]>(
            this.apiURL + '/deleteEmployee/'+ id,
            this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }

     // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}