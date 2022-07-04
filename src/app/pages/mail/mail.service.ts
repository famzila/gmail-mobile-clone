import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CATEGORY, CATEGORY_CODE } from 'src/app/shared/constants/categories';
import { TYPE } from 'src/app/shared/constants/types';
import { IMail } from 'src/app/shared/models/mail.model';



@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }


  /**
   * Get email by type if exist or category
   * @param type type of the email
   * @param category category of the email
   * @returns list of emails based on type or category if provided
   */
  getEmailsList(type?: string, category?: string): Observable<IMail[]> {

      if(type !== undefined){
        return this.getEmailsByType(type);
      }
      else if(category !== undefined){
        return this.getEmailsByCategory(category);
      }

      return this.getAllEmails();
  }

  /**
   * Get all inboxes without filter
   */
  getAllEmails(): Observable<IMail[]>{
    return this.http.get<IMail[]>("./assets/dummy.data.json");
  }

  getEmailById(emailId: string): Observable<IMail>{
    return this.http.get<IMail[]>("./assets/dummy.data.json").pipe(
      map(emails => emails.find(e => e.id = emailId))
    )
  }


  getEmailsByCategory(category: string): Observable<IMail[]> {
    switch (category) {
      case CATEGORY.ALL:
          return this.getEmailsOfCategory();
      case CATEGORY.PRIMARY:
          return this.getEmailsOfCategory(CATEGORY_CODE.PRIMARY_CODE);
      case CATEGORY.PROMOTIONS:
          return this.getEmailsOfCategory(CATEGORY_CODE.PROMOTION_CODE);
      case CATEGORY.SOCIAL:
          return this.getEmailsOfCategory(CATEGORY_CODE.SOCIAL_CODE);
    
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
      // TO-DO: implement other types
      // case TYPE.SPAM:
      //     return this.getStaredEmails();
      // case TYPE.DRAFTS:
      //     return this.getStaredEmails();
      // case TYPE.TRASH:
      //     this.getStaredEmails();
    
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

  getEmailsOfCategory(category?: string): Observable<IMail[]> {
    if(category === undefined){
      return this.getAllEmails();
    } else {
      return this.http.get<any>("./assets/dummy.data.json").pipe(
        map((mails: IMail[]) => mails.filter(m => m.category === category)),
        tap(data => console.log(data))
      );
    }
  }


  
  searchEmails(): Observable<IMail[]> {
    return of([]);
  }




}
