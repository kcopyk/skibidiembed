import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IotDataService {

  private apiUrl = ' '; //replace with api
  constructor(private http: HttpClient) { }

  getSensorData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
