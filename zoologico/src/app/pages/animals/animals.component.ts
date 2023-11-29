import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  providers: [
    MessageService, 
    AnimalService
  ]
})
export class AnimalsComponent implements OnInit {

  animalDialog: boolean = false;

  deleteAnimalDialog: boolean = false;

  deleteAnimalsDialog: boolean = false;

  animals: Animal[] = [];

  animal: Animal = {};

  selectedAnimals: Animal[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    this.getAllAnimals();

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.animal = {};
    this.submitted = false;
    this.animalDialog = true;
  }

  public getAllAnimals(): void {
    this.animalService.getAllAnimals().subscribe(
      (data: Animal[]) => {
        this.animals = data;
        console.log(this.animals);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  findAnimalById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.animals.length; i++) {
      if (this.animals[i].animalCode === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  public saveAnimal() {
    this.submitted = true;

    this.animalService.registerAnimal(this.animal).subscribe(
      (data: Animal) => {
        console.log(data);
        this.animalDialog = false;
        this.animal = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Animal Created', life: 3000 });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Animal Not Created', life: 3000 });
      }
    );
  }

  public editAnimal(animal: Animal) {
    this.animal = { ...animal };
    this.animalDialog = true;
  }

  public deleteAnimal(animal: Animal) {
    this.deleteAnimalDialog = true;
    this.animal = { ...animal };
  }

  public deleteSelectedAnimals() {
    this.deleteAnimalsDialog = true;
  }

  confirmDelete() {
    this.deleteAnimalDialog = false;
    this.animals = this.animals.filter(val => val.animalCode !== this.animal.animalCode);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Animal Deleted', life: 3000 });
    this.animal = {};
  }

  confirmDeleteSelected() {
    this.deleteAnimalsDialog = false;
    this.animals = this.animals.filter(val => !this.selectedAnimals.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Animals Deleted', life: 3000 });
    this.selectedAnimals = [];
  }

  hideDialog() {
    this.animalDialog = false;
    this.submitted = false;
  }

  // createId(): string {
  //   let id = '';
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (let i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
