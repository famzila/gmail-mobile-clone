import { Component } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.page.html',
  styleUrls: ['./meet.page.scss'],
})
export class MeetPage {

  constructor(private toastCtr: ToastController, private popoverCtr: PopoverController) { }

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

  /**
   * Show toast for none implemented features
   */
  async presentToast() {
    const toast = await this.toastCtr.create({
      message: "Not implemented",
      duration: 2000
    });
    toast.present();
 }

 /**
  * Refresh loader to update emails list
  * @param event refrech event
  */
  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
      // TO-DO: Re-fetch emails list
    }, 2000)
  }
  
}
