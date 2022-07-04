import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMail } from 'src/app/shared/models/mail.model';
import { hashCode, intToRGB } from 'src/app/shared/utils/generators.utils';
import { MailService } from '../mail/mail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  selectedEmail: IMail = undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private emailService: MailService, 
              private toastCtr: ToastController) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has("id")) {
        const emailId = params.get("id");

        if (emailId) {
          this.emailService.getEmailById(emailId).subscribe(email => {
            this.selectedEmail = { ...email, color: intToRGB(hashCode(email.from)) };
            console.log(this.selectedEmail);
          })
        }
      }
    })
  }

  /**
   * Display Toast for non implemented features
   */
   async presentToast() {
    const toast = await this.toastCtr.create({
      message: "Not implemented",
      duration: 2000
    });
    toast.present();
  }

}
