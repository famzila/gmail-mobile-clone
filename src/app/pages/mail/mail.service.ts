import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CATEGORY, CATEGORY_CODE } from 'src/app/shared/constants/categories';
import { TYPE } from 'src/app/shared/constants/types';
import { IMail } from 'src/app/shared/models/mail.model';



@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }


  getEmailsList(type?: string, category?: string): Observable<IMail[]> {

      if(type !== undefined){
        return this.getEmailsByType(type);
      }
      else if(category !== undefined){
        return this.getEmailsByCategory(category);
      }

      return this.getAllEmails();
  }

  getAllEmails(): Observable<IMail[]>{
    return this.http.get<any>("./assets/dummy.data.json");
  }


  getEmailsByCategory(category: string): Observable<IMail[]> {
    switch (category) {
      case CATEGORY.ALL:
          return this.getAllEmails();
      case CATEGORY.PRIMARY:
          return this.getAllEmails();
      case CATEGORY.PROMOTIONS:
          return this.getAllEmails();
      case CATEGORY.SOCIAL:
          return this.getAllEmails();
    
      default:
        return of([]);
    }
  }

  getEmailsByType(type: string): Observable<IMail[]> {
    switch (type) {
      case TYPE.STARRED:
          return this.getStaredEmails();
      case TYPE.IMPORTANT:
          return this.getImportantEmails();
      case TYPE.SPAM:
          return this.getStaredEmails();
      case TYPE.DRAFTS:
          return this.getStaredEmails();
      case TYPE.TRASH:
          this.getStaredEmails();
    
      default:
        return of([]);
    }
  }

  
  getStaredEmails(): Observable<IMail[]> {
    return this.http.get<any>("./assets/dummy.data.json").pipe(
      map((mails: IMail[]) => mails.filter(m => m.star === true)),
      tap(data => console.log(data))
    );
  }

  getImportantEmails(): Observable<IMail[]> {
    return this.http.get<any>("./assets/dummy.data.json").pipe(
      map((mails: IMail[]) => mails.filter(m => m.important === true)),
      tap(data => console.log(data))
    );
  }

  getEmailsOfCategory(category: string): Observable<IMail[]> {
    return this.http.get<any>("./assets/dummy.data.json").pipe(
      map((mails: IMail[]) => mails.filter(m => m.category === CATEGORY_CODE.CAT1)),
      tap(data => console.log(data))
    );
  }


  
  searchEmails(): Observable<IMail[]> {
    return of([]);
  }




}
