import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [
    MessageService, 
    EmployeesService
  ]
})
export class EmployeesComponent implements OnInit {

  employeeDialog: boolean = false;

  editEmployeeDialog: boolean = false;

  deleteEmployeeDialog: boolean = false;

  deleteEmployeesDialog: boolean = false;

  employees: Employee[] = [];

  employee: Employee = {};

  selectedEmployees: Employee[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

}
