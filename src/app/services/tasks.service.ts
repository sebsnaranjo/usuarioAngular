import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  urlAPI = '/api/Users';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(`${this.urlAPI}`);
  }

  getUserID(id: number){
    return this.http.get<any>(`${this.urlAPI}/${id}`);
  }

  createUser(user: UserData) {
    return this.http.post<any>(`${this.urlAPI}`, user);
  }

  editUser(user: UserData, id: number) {
    return this.http.put<any>(`${this.urlAPI}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
  }
}
