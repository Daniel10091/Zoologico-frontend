import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SupplierService {

  private static readonly API = `${environment.apiURLBase}/fornecedor`;

  constructor(private http: HttpClient) { }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(SupplierService.API);
  }

  registerSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(SupplierService.API, supplier);
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${SupplierService.API}/${supplier.fornecedorCode}`, supplier);
  }

  deleteSupplier(supplier: Supplier): Observable<any> {
    return this.http.delete<any>(`${SupplierService.API}/${supplier.fornecedorCode}`);
  }

}
