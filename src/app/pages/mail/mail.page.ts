import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { hashCode, intToRGB } from 'src/app/shared/utils/generators.utils';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails: any[];
  lastScrollTop: number = 0;
  removeSearch : boolean = false;

  constructor(private http: HttpClient, private router: Router, private popOverCtr: PopoverController) { }

  ngOnInit() {
    this.http.get<any[]>('./assets/dummy.data.json').subscribe(data => {
      console.log(data);
      this.emails = data.map( email => {
          return email = { ...email,
            color: intToRGB(hashCode(email.from))
          }
      })
    });
  }


  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000)
  }

  async openAccount(event) {
    const popover = await this.popOverCtr.create({
      component: AccountPage,
      event: event,
      cssClass: 'custom-popover'
    });

    await popover.present();
  }

  openEmail(event) {
    this.router.navigateByUrl("tabs/mail/" + event);
  }
  
  scrolling(event){
    if(this.lastScrollTop < event.detail.scrollTop){
      this.removeSearch = true;
    } else {
      this.removeSearch = false;
    }
    this.lastScrollTop = event.detail.scrollTop;
  }

}
