import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnimalService {

  private static readonly API = `${environment.apiURLBase}/animal`;

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(AnimalService.API);
  }

  registerAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(AnimalService.API, animal);
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${AnimalService.API}/${animal.animalCode}`, animal);
  }

  deleteAnimal(animal: Animal): Observable<any> {
    return this.http.delete<any>(`${AnimalService.API}/${animal.animalCode}`);
  }

}
