import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { Department } from "../models/Department";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  private url = "http://localhost:3000/department";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Department[]> {
    return this.http
      .get<Department[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Department[]>("fetchAll", []))
      );
  }

  createDepartment(
    formData: Partial<Department>,
    userId: Pick<User, "id">
  ): Observable<Department> {
    return this.http
      .post<Department>(
        this.url,
        { title: formData.title, body: formData.body, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Department>("createDepartment"))
      );
  }

  deleteDepartment(departmentId: Pick<Department, "id">): Observable<{}> {
    return this.http
      .delete<Department>(`${this.url}/${departmentId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Department>("deleteDepartment"))
      );
  }
}

