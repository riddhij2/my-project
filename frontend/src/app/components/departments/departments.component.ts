import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { DepartmentService } from "src/app/services/department.service";
import { AuthService } from "src/app/services/auth.service";

import { Department } from "src/app/models/Department";
import { User } from "src/app/models/User";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.scss"],
})
export class DepartmentsComponent implements OnInit {
  departments$: Observable<Department[]>;
  userId: Pick<User, "id">;

  constructor(
    private departmentService: DepartmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.departments$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Department[]> {
    return this.departmentService.fetchAll();
  }

  createDepartment(): void {
    this.departments$ = this.fetchAll();
  }

  delete(departmentId: Pick<Department, "id">): void {
    this.departmentService
      .deleteDepartment(departmentId)
      .subscribe(() => (this.departments$ = this.fetchAll()));
  }
}
