import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.page.html',
  styleUrls: ['./meet.page.scss'],
})
export class MeetPage implements OnInit {

  constructor(private toastCtr: ToastController) { }

  ngOnInit() {
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
