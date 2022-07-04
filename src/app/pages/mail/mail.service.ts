import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CATEGORY, CATEGORY_CODE } from 'src/app/shared/constants/categories';
import { TYPE } from 'src/app/shared/constants/types';
import { IEmail } from 'src/app/shared/models/mail.model';



@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }


  /**
   * Get email by type if exist or category
   * @param type type of the email
   * @param category category of the email
   * @returns list of emails based on type or category if provided
   */
  getEmailsList(type?: string, category?: string): Observable<IEmail[]> {

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
  getAllEmails(): Observable<IEmail[]>{
    return this.http.get<IEmail[]>("./assets/dummy.data.json");
  }

  /**
   * Get email by ID
   * @param emailId email id
   * @returns returns the email data
   */
  getEmailById(emailId: string): Observable<IEmail>{
    return this.http.get<IEmail[]>("./assets/dummy.data.json").pipe(
      map(emails => emails.find(e => e.id = emailId))
    )
  }


  /**
   * Get emails list by category
   * @param category the selected category
   */
  getEmailsByCategory(category: string): Observable<IEmail[]> {
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

  /**
   * Emails list by type
   * @param type email type: starred, important, trash, ..etc
   * @returns returns emails list
   */
  getEmailsByType(type: string): Observable<IEmail[]> {
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

  /**
   * Get starred emails only
   */
  getStaredEmails(): Observable<IEmail[]> {
    return this.http.get<any>("./assets/dummy.data.json").pipe(
      map((emails: IEmail[]) => emails.filter(m => m.star === true)),
      tap(data => console.log(data))
    );
  }

  /**
   * Get important emails only
   */
  getImportantEmails(): Observable<IEmail[]> {
    return this.http.get<any>("./assets/dummy.data.json").pipe(
      map((emails: IEmail[]) => emails.filter(m => m.important === true)),
      tap(data => console.log(data))
    );
  }

  /**
   * Get emails of given category
   * @param category name
   * @returns emails list 
   */
  getEmailsOfCategory(category?: string): Observable<IEmail[]> {
    if(category === undefined){
      return this.getAllEmails();
    } else {
      return this.http.get<any>("./assets/dummy.data.json").pipe(
        map((emails: IEmail[]) => emails.filter(m => m.category === category)),
        tap(data => console.log(data))
      );
    }
  }

}
