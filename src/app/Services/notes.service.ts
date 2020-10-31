import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  ApiUrl = "https://routeegypt.herokuapp.com/";
  constructor(private http:HttpClient) { }
//  get all notes 
getTaks(data):Observable<any>{
   //send post request to server by sending userID , token 
  return this.http.post(this.ApiUrl +'getUserNotes',data)
}

// add note service
addNote(data):Observable<any>{
  return this.http.post(this.ApiUrl +'addNote',data);
}

  // delete note service
  deleteNote(data): Observable<any> {
    // the delete services must have option and headers 

    let options = {
      headers:new HttpHeaders({
        
      }),
      body:{
        NoteID: data.NoteID,
        token:data.token
      }
    }
    return this.http.delete(this.ApiUrl + 'deleteNote',options);
  }

  // update note 
  updateNote(data):Observable<any>{
    return this.http.put(this.ApiUrl +'updateNote',data);
  }
}
