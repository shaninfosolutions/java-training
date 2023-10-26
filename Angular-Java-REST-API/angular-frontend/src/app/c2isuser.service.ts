import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { C2isUser } from './c2isuser';


@Injectable({
  providedIn: 'root'
})
export class C2isuserService {
  private baseUrl = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<C2isUser[]>{
    return this.httpClient.get<C2isUser[]>(`${this.baseUrl}`);
  }

  getUserList(): Observable<C2isUser[]> {
    return this.httpClient.get<C2isUser[]>(`${this.baseUrl}`);
  }

  createUser(c2isuser: C2isUser): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, c2isuser);
  }

  getUserById(id: number): Observable<C2isUser>{
    return this.httpClient.get<C2isUser>(`${this.baseUrl}/${id}`);
  }

  updateUser(id:number, c2isuser:C2isUser): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, c2isuser);
  }

  deleteUser(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
