import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { appPagesMenu, appsMenu, labelsMenu, otherMenu } from './shared/constants/menu-list';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = appPagesMenu;
  public labels = labelsMenu;
  public apps = appsMenu;
  public other = otherMenu;

  constructor(private toastCtr: ToastController) { }

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
