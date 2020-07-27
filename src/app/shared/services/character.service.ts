import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '@environment/environment';
import { Character } from '../components/interfaces/character.interface';
import { Observable, throwError } from 'rxjs';
import { TrackHttpError } from "../models/trackHttpError";
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http:HttpClient) { }

  searchCharacters(query='',page=1):Observable<Character[] | TrackHttpError>{
    const filter=`${environment.baseUrlApi}/?name=${query}&page=${page}`
    return this.http.get<Character[]>(filter)
    .pipe(catchError((err)=>this.handleHttpError(err)));
  }

  getDetails(id:number){
    return this.http.get<Character>(`${environment.baseUrlApi}/${id}`)
    .pipe(catchError((err)=>this.handleHttpError(err)));
  }


  private handleHttpError(error:HttpErrorResponse):Observable<TrackHttpError>{
      
    let dataError=new TrackHttpError();
    dataError.errorNumber=error.status;
    dataError.message=error.statusText;
    dataError.friendlyMessage='An error occured retrienving data.'
    return throwError(dataError);

  }
}
