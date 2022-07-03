import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.page.html',
  styleUrls: ['./meet.page.scss'],
})
export class MeetPage implements OnInit {

  constructor(private toastCtr: ToastController, private popoverCtr: PopoverController) { }

  ngOnInit() {
  }

  /**
   * Show account details
   * @param event click event
   */
   async openAccount(event) {
    const popover = await this.popoverCtr.create({
      component: AccountPage,
      event: event,
    });

    await popover.present();
  }

  async presentToast() {
    const toast = await this.toastCtr.create({
      message: "Not implemented",
      duration: 2000
    });
    toast.present();
 }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000)
  }
  
}
