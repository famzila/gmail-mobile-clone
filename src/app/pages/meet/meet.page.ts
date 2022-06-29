import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.page.html',
  styleUrls: ['./meet.page.scss'],
})
export class MeetPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 2000)
  }
  
}
