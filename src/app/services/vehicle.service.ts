import { Vehicle } from './../../shared/models/vehicle.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = environment.apiUrl;
  constructor(public http: HttpClient) {}

  postVehicle(Vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicleList`, Vehicle);
  }

  getVehicle(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicleList`);
  }
  putVehicle(Vehicle: Vehicle, id: number) {
    return this.http.put<Vehicle>(`${this.apiUrl}/vehicleList/${id}`, Vehicle);
  }
  deleteVehicle(id: number) {
    return this.http.delete<Vehicle>(`${this.apiUrl}/vehicleList/${id}`);
  }
}
