import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Zoo } from 'src/app/models/zoo';
import { ZooService } from 'src/app/services/zoo.service';

@Component({
  selector: 'app-zoos',
  templateUrl: './zoos.component.html',
  styleUrls: ['./zoos.component.scss'],
  providers: [
    MessageService, 
    ZooService
  ]
})
export class ZoosComponent implements OnInit {
  
  zooDialog: boolean = false;

  editZooDialog: boolean = false;

  deleteZooDialog: boolean = false;

  deleteZoosDialog: boolean = false;

  zoos: Zoo[] = [];

  zoo: Zoo = {};

  selectedZoos: Zoo[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private zooService: ZooService
  ) { }

  ngOnInit(): void {
    this.getAllZoos();
  }

  openNew() {
    this.zoo = {};
    this.submitted = false;
    this.zooDialog = true;
  }

  public getAllZoos(): void {
    this.zooService.getAllZoos().subscribe(
      (data: Zoo[]) => {
        this.zoos = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public findZooById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.zoos.length; i++) {
      if (this.zoos[i].zoologicoCode === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  public saveZoo(): void {
    var enderecoCode = this.zoo.enderecoCode;

    this.zoo.enderecoCode = Number(enderecoCode);

    this.submitted = true;

    if (this.editZooDialog) {
      if (this.zoo.zoologicoCode !== undefined) {
        this.zooService.updateZoo(this.zoo).subscribe(
          (response: Zoo) => {
            this.getAllZoos();
            
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `O Zoologico ${response.zoologicoNome} foi atualizado com sucesso!`,
              life: 6000
            });
            
            this.zooDialog = false;
            this.editZooDialog = false;
            this.zoo = {};
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
      this.zooService.registerZoo(this.zoo).subscribe(
        (response: Zoo) => {
          this.getAllZoos();

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `O Zoologico ${response.zoologicoNome} foi registrado com sucesso!`, 
            life: 6000
          });

          this.zooDialog = false;
          this.zoo = {};
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

  public editZoo(zoo: Zoo): void {
    this.zoo = { ...zoo };
    this.zooDialog = true;
    this.editZooDialog = true;
  }

  public deleteZoo(zoo: Zoo): void {
    this.zoo = { ...zoo };
    this.deleteZooDialog = true;
  }

  public deleteSelectedZoos(): void {
    // this.deleteZoosDialog = true;
  }

  public confirmDelete(): void {
    this.deleteZooDialog = false;
    this.zooService.deleteZoo(this.zoo).subscribe(
      (data: any) => {
        // console.log(data);
        this.getAllZoos();
        this.zoo = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Zoologico excluído com sucesso!'
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir zoologico!'
        });
      }
    );
  }

  hideDialog(): void {
    this.zooDialog = false;
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
