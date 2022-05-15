import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:5000/api";


  constructor(private http:HttpClient) { }

  getTaskList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/tasks');
  }

  addTask(val:any){
    return this.http.post(this.APIUrl+'/tasks',val);
  }

  updateTask(val:any){
    return this.http.put(this.APIUrl+'/tasks/'+val.Id,val);
  }

  deleteTask(val:any){
    return this.http.delete(this.APIUrl+'/tasks/'+val);
  }


}
