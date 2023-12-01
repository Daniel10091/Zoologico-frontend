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

  editAnimalDialog: boolean = false;

  deleteAnimalDialog: boolean = false;

  deleteAnimalsDialog: boolean = false;

  animals: Animal[] = [];

  animal: Animal = {};

  selectedAnimals: Animal[] = [];

  animalDataNascimentoIsValid: boolean = true;

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

        this.animals.forEach((animal: Animal) => {
          var [year, month, day]: any = animal.animalDataNascimento?.split('-');
          animal.animalDataNascimento = `${day}-${month}-${year}`;
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public findAnimalById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.animals.length; i++) {
      if (this.animals[i].animalCode === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  public saveAnimal(): void {
    var especieCode = this.animal.especieCode;
    var zoologicoCode = this.animal.zoologicoCode;

    this.animal.especieCode = Number(especieCode);
    this.animal.zoologicoCode = Number(zoologicoCode);

    this.submitted = true;
    
    if (this.editAnimalDialog) {
      var [day, month, year]: any = this.animal.animalDataNascimento?.replaceAll('/', '-').split('-');
      this.animal.animalDataNascimento = `${year}-${month}-${day}`;

      var animal: Animal = {
        animalCode: this.animal.animalCode,
        animalNome: this.animal.animalNome,
        animalDataNascimento: this.animal.animalDataNascimento,
        animalCor: this.animal.animalCor,
        animalTamanho: this.animal.animalTamanho,
        animalDescricao: this.animal.animalDescricao,
        especieCode: this.animal.especieCode,
        zoologicoCode: this.animal.zoologicoCode,
      };

      this.animalService.updateAnimal(animal).subscribe(
        (response: Animal) => {
          this.getAllAnimals();

          this.messageService.add({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: `O Animal ${response.animalNome} foi atualizado com sucesso!`, 
            life: 6000 
          });
          
          this.animalDialog = false;
          this.animal = {};
          this.editAnimalDialog = false;
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
      var [day, month, year]: any = this.animal.animalDataNascimento?.split('/');
      this.animal.animalDataNascimento = `${year}-${month}-${day}`;
      
      this.animalService.registerAnimal(this.animal).subscribe(
        (response: Animal) => {
          this.getAllAnimals();
          
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: `O Animal ${response.animalNome} foi registrado com sucesso!`, 
            life: 6000 
          });
          
          this.animalDialog = false;
          this.animal = {};
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

  public editAnimal(animal: Animal) {
    this.animal = { ...animal };
    this.animalDialog = true;
    this.editAnimalDialog = true;
  }

  public deleteAnimal(animal: Animal) {
    this.animal = { ...animal };
    this.deleteAnimalDialog = true;
  }

  public deleteSelectedAnimals() {
    // this.deleteAnimalsDialog = true;
  }

  confirmDelete() {
    this.deleteAnimalDialog = false;
    this.animalService.deleteAnimal(this.animal).subscribe(
      (data: any) => {
        // console.log(data);
        this.getAllAnimals();
        this.animal = {};
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Sucesso', 
          detail: 'Animal excluído com sucesso!', 
          life: 3000 
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erro', 
          detail: 'Não foi possível excluir o Animal', 
          life: 3000 
        });
      }
    );
  }

  confirmDeleteSelected() {
    // this.deleteAnimalsDialog = false;
    // this.animals = this.animals.filter(val => !this.selectedAnimals.includes(val));
    // this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Animais Removidos', life: 3000 });
    // this.selectedAnimals = [];
  }

  hideDialog() {
    this.animalDialog = false;
    this.submitted = false;
  }

  checkDateValue(value: any) {
    this.animalDataNascimentoIsValid = false;
    
    if (value.length === 10) {
      var date = value.split('/');
      var day = date[0];
      var month = date[1];
      var year = date[2];

      var dateObject = new Date(year, month - 1, day);

      if (
        dateObject.getFullYear() == year &&
        dateObject.getMonth() + 1 == month &&
        dateObject.getDate() == day
      ) {
        this.animalDataNascimentoIsValid = true;
      }
    }
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
    console.log((event.target as HTMLInputElement).value);
    
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
