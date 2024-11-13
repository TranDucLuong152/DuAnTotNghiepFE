import { Injectable } from '@angular/core';
import { ApiConfigService } from '../ApiConfigService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRespone } from '../../entity/api-respone';
import { userRequest } from '../../entity/request/user-request';
import { Users } from '../../entity/user/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = ApiConfigService.apiUrl;
  constructor(private http : HttpClient) { }
  getAllList():Observable<ApiRespone>{
    return this.http.get<ApiRespone>(this.url+"/api/v1/users");
  }
  
  getById(idUser : String):Observable<ApiRespone>{
    
    return this.http.get<ApiRespone>(this.url+"/api/v1/users/"+idUser);
  }
  removeUser(idUser: String): Observable<ApiRespone> {
    return this.http.put<ApiRespone>(`${this.url}/api/v1/users/${idUser}/delete`, {});
}
  postUser(formData: FormData): Observable<ApiRespone> {
    return this.http.post<ApiRespone>(this.url + "/api/v1/users", formData);
  }
  
  putUser(formData: FormData, idUser: String): Observable<ApiRespone> {
    return this.http.put<ApiRespone>(`${this.url}/api/v1/users/${idUser}`, formData);
}

// postUser(foodRequest : userRequest, file : File):Observable<ApiRespone>{  
//   const data = new FormData();
//   data.append('fullname',foodRequest.fullname)
//   data.append('username',foodRequest.username)
//   data.append('isAdmin',foodRequest.isAdmin?'True':'False')
//   data.append('isDeleted',foodRequest.isDeleted?'True':'False')
//   if (file) {
//     data.append('file', file); 
// }
//   return this.http.post<ApiRespone>(this.url+"/api/v1/users",data)
// }

// putUser(foodRequest : userRequest, file : File,idUser :String):Observable<ApiRespone>{
//   const data = new FormData();
//   data.append('fullname',foodRequest.fullname)
//   data.append('username',foodRequest.username)
//   data.append('isAdmin',foodRequest.isAdmin?'True':'False')
//   data.append('isDeleted',foodRequest.isDeleted?'True':'False')
//   data.append('file',file)

//   return this.http.post<ApiRespone>(this.url+"/api/v1/users/"+idUser,data)
// }
}

