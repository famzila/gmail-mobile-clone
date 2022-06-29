import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'All inboxes', url: '/tabs/mail', icon: 'mail' },
    { title: 'Primary', url: '/tabs/mail', icon: 'mail' },
    { title: 'Promotions', url: '/tabs/mail', icon: 'mail' },
    { title: 'Social', url: '/tabs/mail', icon: 'mail' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [
    { title: 'Starred', url: '/tabs/mail', icon: 'star' },
    { title: 'Snoozed', url: '/tabs/mail', icon: 'time' },
    { title: 'Important', url: '/tabs/mail', icon: 'bookmarks' },
    { title: 'Sent', url: '/tabs/mail', icon: 'send' },
    { title: 'Scheduled', url: '/folder/Trash', icon: 'timer' },
    { title: 'Outbox', url: '/folder/Spam', icon: 'archive' },
    { title: 'Drafts', url: '/folder/Spam', icon: 'document' },
    { title: 'All mail', url: '/folder/Spam', icon: 'mail' },
    { title: 'Spam', url: '/folder/Spam', icon: 'alert-circle' },
    { title: 'Bin', url: '/folder/Spam', icon: 'trash' },
  ];

  public apps = [
    { title: 'Calendar', url: '/tabs/mail', icon: 'calendar' },
    { title: 'Contacts', url: '/tabs/mail', icon: 'person-circle' },
  ];

  public other = [
    { title: 'Settings', url: '/tabs/mail', icon: 'settings' },
    { title: 'Help and feedback', url: '/tabs/mail', icon: 'help-circle' },
  ];

  constructor() {}
}
