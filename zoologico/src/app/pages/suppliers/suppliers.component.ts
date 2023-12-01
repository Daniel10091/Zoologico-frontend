import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  providers: [
    MessageService, 
    SupplierService
  ]
})
export class SuppliersComponent implements OnInit {

  supplierDialog: boolean = false;

  editSupplierDialog: boolean = false;

  deleteSupplierDialog: boolean = false;

  deleteSuppliersDialog: boolean = false;

  suppliers: Supplier[] = [];

  supplier: Supplier = {};

  selectedSuppliers: Supplier[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  openNew() {
    this.supplier = {};
    this.submitted = false;
    this.supplierDialog = true;
  }

  public getAllSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public findSupplierById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.suppliers.length; i++) {
      if (this.suppliers[i].fornecedorCode === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  public saveSupplier(): void {
    var enderecoCode = this.supplier.enderecoCode;

    this.supplier.enderecoCode = Number(enderecoCode);

    this.submitted = true;

    if (this.editSupplierDialog) {
      if (this.supplier.fornecedorCode !== undefined) {
        this.supplierService.updateSupplier(this.supplier).subscribe(
          (response: Supplier) => {
            this.getAllSuppliers();
            
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `O fornecedor ${response.fornecedorRazaoSocial} foi atualizado com sucesso!`,
              life: 6000
            });

            this.supplierDialog = false;
            this.editSupplierDialog = false;
            this.supplier = {};
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
    }	else {
      this.supplierService.registerSupplier(this.supplier).subscribe(
        (response: Supplier) => {
          this.getAllSuppliers();
          
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `O fornecedor ${response.fornecedorRazaoSocial} foi registrado com sucesso!`,
            life: 6000
          });

          this.supplierDialog = false;
          this.supplier = {};
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
  }

  public editSupplier(supplier: Supplier): void {
    this.supplier = { ...supplier };
    this.supplierDialog = true;
    this.editSupplierDialog = true;
  }

  public deleteSupplier(supplier: Supplier): void {
    this.supplier = { ...supplier };
    this.deleteSupplierDialog = true;
  }

  public deleteSelectedSuppliers(): void {
    // this.deleteSuppliersDialog = true;
  }

  confirmDelete(): void {
    this.deleteSupplierDialog = false;
    this.supplierService.deleteSupplier(this.supplier).subscribe(
      (data: any) => {
        this.getAllSuppliers();
        this.supplier = {};
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Sucesso', 
          detail: 'Fornecedor Removido', 
          life: 3000 
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erro', 
          detail: 'Não foi possível excluir o Fornecedor', 
          life: 3000 
        });
      }
    );
  }

  public hideDialog(): void {
    this.supplierDialog = false;
    this.submitted = false;
  }
  
  confirmDeleteSelected(): void {
    // this.deleteZoosDialog = false;
    // this.zoos = this.zoos.filter(val => !this.selectedZoos.includes(val));
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Sucesso',
    //   detail: 'Zoologicos deletados com sucesso!'
    // });
    // this.selectedZoos = [];
  }

  onGlobalFilter(table: Table, event: Event) {
    console.log((event.target as HTMLInputElement).value);
    
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
