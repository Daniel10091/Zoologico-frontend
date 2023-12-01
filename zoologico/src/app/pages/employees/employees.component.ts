import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Departament } from 'src/app/models/departament';
import { Employee } from 'src/app/models/employee';
import { Position } from 'src/app/models/position';
import { Zoo } from 'src/app/models/zoo';
import { DepartamentService } from 'src/app/services/departament.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';
import { ZooService } from 'src/app/services/zoo.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [
    MessageService, 
    EmployeeService,
    ZooService,
    PositionService,
    DepartamentService
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

  cpfIsValid: boolean = true;

  // ======================

  zoos: SelectItem[] = [];
  
  // selectedZoo: SelectItem = { value: '' };
  selectedZoo: any = null;

  positions: SelectItem[] = [];

  // selectedPosition: SelectItem = { value: '' };
  selectedPosition: any = null;

  // departaments: SelectItem[] = [];

  // selectedDepartament: SelectItem = { value: '' };

  constructor(
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private zooService: ZooService,
    private positionService: PositionService,
    private departamentService: DepartamentService
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
    
    this.getAllZoos();
    this.getAllPositions();
    // this.getAllDepartaments();
  }

  public getAllZoos(): void {
    this.zoos = [];
    this.zooService.getAllZoos().subscribe(
      (data: Zoo[]) => {
        for (let i = 0; i < data.length; i++) {
          this.zoos.push({ 
            label: data[i].zoologicoNome, 
            value: {
              id: data[i].zoologicoCode,
              nome: data[i].zoologicoNome,
              code: data[i].zoologicoCnpj
            }
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getAllPositions(): void {
    this.positions = [];
    this.positionService.getAllPositions().subscribe(
      (data: Position[]) => {
        for (let i = 0; i < data.length; i++) {
          this.positions.push({ 
            label: data[i].cargoTitulo, 
            value: {
              id: data[i].cargoCode,
              nome: data[i].cargoTitulo
            }
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  // public getAllDepartaments(): void {
  //   this.departaments = [];
  //   this.departamentService.getAllDepartaments().subscribe(
  //     (data: Departament[]) => {
  //       for (let i = 0; i < data.length; i++) {
  //         this.departaments.push({ 
  //           label: data[i].departamentoNome, 
  //           value: {
  //             id: data[i].departamentoCode,
  //             nome: data[i].departamentoNome
  //           }
  //         });
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //     }
  //   );
  // }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  public getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;

        this.employees.forEach(employee => {
          employee.nuCpf = employee.nuCpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        });          
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public findEmployeeById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].code === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  public saveEmployee(): void {
    var enderecoCode = this.employee.enderecoCode;
    var zoologicoCode = this.employee.zoologicoCode;
    var cargoCode = this.employee.cargoCode;
    var departamentoCode = this.employee.departamentoCode;

    this.employee.enderecoCode = Number(enderecoCode);
    this.employee.zoologicoCode = Number(zoologicoCode);
    this.employee.cargoCode = Number(cargoCode);
    this.employee.departamentoCode = Number(departamentoCode);

    this.submitted = true;

    if (this.editEmployeeDialog) {
      if (this.employee.zoologicoCode !== undefined) {
        this.employeeService.updateEmployee(this.employee).subscribe(
          (response: Employee) => {
            this.getAllEmployees();
            
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `O Funcionário ${response.nome} foi atualizado com sucesso!`,
              life: 6000
            });
            
            this.employeeDialog = false;
            this.editEmployeeDialog = false;
            this.employee = {};

            this.zoos = [];
            this.positions = [];
            // this.departaments = [];

            this.selectedZoo = {};
            this.selectedPosition = {};
            // this.selectedDepartament = { value: '' };
          },
          (error: HttpErrorResponse) => {
            console.log(error.error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `${error.error.detail}`, 
              life: 6000
            });
          }
        );
      }
    } else {
      if (this.employee.nome !== undefined && this.employee.sobrenome !== undefined && this.employee.nuCpf !== undefined && this.employee.pais !== undefined && this.employee.estado !== undefined && this.employee.cidade !== undefined && this.employee.logradouro !== undefined && this.selectedZoo !== null && this.selectedPosition !== null) {

        this.employee.zoologicoCode = Number(this.selectedZoo.id);
        this.employee.cargoCode = Number(this.selectedPosition.id);

        this.employeeService.registerEmployee(this.employee).subscribe(
          (response: Employee) => {
            this.getAllEmployees();

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `O Funcionário ${response.nome} foi registrado com sucesso!`, 
              life: 6000
            });

            this.employeeDialog = false;
            this.employee = {};

            this.zoos = [];
            this.positions = [];
            // this.departaments = [];

            this.selectedZoo = {};
            this.selectedPosition = {};
            // this.selectedDepartament = { value: '' };
          },
          (error: HttpErrorResponse) => {
            console.log(error.error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `${error.error.detail}`, 
              life: 6000
            });
          }
        );
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Preencha todos os campos obrigatórios!',
          life: 6000
        });
      }
    }
  }

  public editEmployee(employee: Employee): void {
    this.employee = { ...employee };
    this.selectedZoo = { id: employee.zoologicoCode, nome: employee.zoologicoNome, code: employee.zoologicoCnpj };
    this.selectedPosition = { id: employee.cargoCode, nome: employee.cargoTitulo };
    this.employeeDialog = true;
    this.editEmployeeDialog = true;
  }

  public deleteEmployee(employee: Employee): void {
    this.employee = { ...employee };
    this.deleteEmployeeDialog = true;
  }

  public deleteSelectedEmployees(): void {
    // this.deleteEmployeesDialog = true;
  }

  public confirmDelete(): void {
    this.deleteEmployeeDialog = false;
    this.employeeService.deleteEmployee(this.employee).subscribe(
      (data: any) => {
        // console.log(data);
        this.getAllEmployees();
        this.employee = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Funcionário excluído com sucesso!'
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir funcionário!'
        });
      }
    );
  }

  hideDialog(): void {
    this.employeeDialog = false;
    this.submitted = false;
  }

  checkCpfValue(cpf: string): void {
    var mask = cpf.replace(/\D/g, '');

    if (mask.length === 11) {
      this.cpfIsValid = true;
    } else {
      this.cpfIsValid = false;
    }
  }

  confirmDeleteSelected(): void {
    // this.deleteEmployeesDialog = false;
    // this.employees = this.employees.filter(val => !this.selectedEmployees.includes(val));
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Sucesso',
    //   detail: 'Funcionários deletados com sucesso!'
    // });
    // this.selectedEmployees = [];
  }

  onGlobalFilter(table: Table, event: Event) {
    console.log((event.target as HTMLInputElement).value);
    
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
