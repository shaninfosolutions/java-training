import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiEndPint: string = "http://localhost:8080/api/HospitalAppointment/"
  constructor(private http: HttpClient) { }

  createNew(obj:any): Observable<any> {
    debugger
    return this.http.post(this.apiEndPint + "AddNewAppointment", obj)
  }

  getAllAppointment(): Observable<any>  {
    return this.http.get< Observable<any> >(this.apiEndPint + "GetAllAppointments")
  }
  getAllTodaysAppointment(): Observable<any>  {
    return this.http.get< Observable<any> >(this.apiEndPint + "GetTodaysAppointments")
  } 

  markAppointmentDone(appintmentId:number): Observable<any>  {
    debugger;
    return this.http.get< Observable<any> >(this.apiEndPint + "MarkAppointmentDone?appointmentId=" + appintmentId)
  } 
}
