import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingController, PopoverController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EmailService } from './mail.service';
import { hashCode, intToRGB } from 'src/app/shared/utils/generators.utils';
import { AccountPage } from '../account/account.page';
import { CATEGORY } from 'src/app/shared/constants/categories';
import { IEmail } from 'src/app/shared/models/mail.model';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  listLabel: string = "All inboxes";
  emails: IEmail[];
  lastScrollTop: number = 0;
  removeSearch: boolean = false;

  constructor(private mailService: EmailService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private popOverCtr: PopoverController,
    private loadingCtr: LoadingController) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.activedRoute.paramMap.subscribe(params => {

      if (params.has('type')) {
        const type = params.get('type');
        this.getEmailList(type);
      } else if (params.has('category')) {
        const category = params.get('category');
        this.getListLabel(category);
        this.getEmailList(undefined, category);
      } else {
        this.getEmailList();
      }
    });
  }

  /**
   * Get emails list
   * @param type by type Starred, important, spam, ...etc
   * @param category by category All, Primary, Promotions or Social
   */
  async getEmailList(type?: string, category?: string) {
    const loading = await this.loadingCtr.create({
      message: 'Loading...'
    });

    loading.present();
    this.mailService.getEmailsList(type, category).subscribe(data => {
      console.log(data);
      loading.dismiss();
        this.emails = data.map(email => {
          return email = {
            ...email,
            color: intToRGB(hashCode(email.from))
          }
        });
    }, catchError(this.handleError));
  }

  /**
   * Refresh the email's list
   * @param event 
   */
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000)
  }

  /**
   * Show account details
   * @param event click event
   */
  async openAccount(event) {
    const popover = await this.popOverCtr.create({
      component: AccountPage,
      event: event,
      cssClass: 'account-popover'
    });

    await popover.present();
  }

  /**
   * Handler to open email details
   * @param id email's id
   */
  openEmail(mailId: string) {
    this.router.navigate(['tabs/mail', mailId]);
  }

  /**
   * Show search input only when scrolling up
   * @param event scroll event
   */
  scrolling(event) {
    if (this.lastScrollTop < event.detail.scrollTop) {
      this.removeSearch = true;
    } else {
      this.removeSearch = false;
    }
    this.lastScrollTop = event.detail.scrollTop;
  }

  /**
   * Update the list label
   * @param category set label with the chosen label
   */
  private getListLabel(category: string) {
    switch (category) {
      case CATEGORY.ALL:
        this.listLabel = "All inboxes";
        break;
      case CATEGORY.PRIMARY:
        this.listLabel = "Primary";
        break;
      case CATEGORY.PROMOTIONS:
        this.listLabel = "Promotions";
        break;
      case CATEGORY.SOCIAL:
        this.listLabel = "Social";
        break;

      default:
        break;
    }
  }


  /**
   * Error handler
   * @param error : returned error
   * @returns returns the error message
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMsg = "";
    // Client side error
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client error occuried: ${error.error.message}`;
    }
    // Server side error
    else {
      errorMsg = `Server error, code: ${error.status}, error message: ${error.message}`;
    }

    console.error(errorMsg);
    return throwError(errorMsg);
  }
}
