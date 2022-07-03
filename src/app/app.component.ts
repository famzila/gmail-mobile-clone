import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'All inboxes', url: '/tabs/mail/category/all', icon: 'mail' },
    { title: 'Primary', url: '/tabs/mail/category/primary', icon: 'mail' },
    { title: 'Promotions', url: '/tabs/mail/category/promotions', icon: 'pricetag' },
    { title: 'Social', url: '/tabs/mail/category/social', icon: 'people' },
    { title: 'Trash', url: '/tabs/mail/type/trash', icon: 'trash' },
    { title: 'Spam', url: '/tabs/mail/type/spam', icon: 'warning' },
  ];
  public labels = [
    { title: 'Starred', url: '/tabs/mail/type/starred', icon: 'star' },
    { title: 'Snoozed', url: '/tabs/mail/type/snoozed', icon: 'time' },
    { title: 'Important', url: '/tabs/mail/type/important', icon: 'bookmarks' },
    { title: 'Sent', url: '/tabs/mail/type/sent', icon: 'send' },
    { title: 'Scheduled', url: '/tabs/mail/type/scheduled', icon: 'timer' },
    { title: 'Outbox', url: '/tabs/mail/type/outbox', icon: 'archive' },
    { title: 'Drafts', url: '/tabs/mail/type/draft', icon: 'document' },
    { title: 'All mail', url: '/tabs/mail/type/all', icon: 'mail' },
    { title: 'Spam', url: '/tabs/mail/type/spam', icon: 'alert-circle' },
    { title: 'Bin', url: '/tabs/mail/type/trash', icon: 'trash' },
  ];

  public apps = [
    { title: 'Calendar', url: '/tabs/mail', icon: 'calendar' },
    { title: 'Contacts', url: '/tabs/mail', icon: 'person-circle' },
  ];

  public other = [
    { title: 'Settings', url: '/tabs/mail', icon: 'settings' },
    { title: 'Help and feedback', url: '/tabs/mail', icon: 'help-circle' },
  ];

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
