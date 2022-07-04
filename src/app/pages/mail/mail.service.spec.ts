import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EmailService } from './mail.service';

describe('MailServiceService', () => {
  let emailService: EmailService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let testData= JSON.stringify("./assets/dummy.data.json");
  let testEmail= {
    "title":"Cillum sint incididunt consectetur deserunt", 
    "from": "lindsaymacdonald@waterbaby.com",
    "read": true,
    "content": "Ut voluptate fugiat cillum incididunt aliqua amet consequat excepteur. Sunt laboris pariatur reprehenderit deserunt nostrud sunt cupidatat. Minim reprehenderit commodo eu consequat ad consectetur dolore. Ipsum excepteur ut ut tempor et consectetur id officia eiusmod ea nostrud. Enim cupidatat Lorem irure Lorem laboris irure ad. Fugiat laborum voluptate mollit culpa enim ad ea adipisicing.\r\nAliquip nostrud veniam voluptate veniam do sit. Fugiat labore adipisicing mollit ea pariatur culpa sit aute non tempor cillum cillum veniam eu. Veniam cupidatat sit dolor aliqua Lorem in esse. Commodo et ut incididunt ullamco in id consectetur eiusmod. Sint dolore Lorem sint mollit ipsum. Veniam eu ut sunt reprehenderit ex non commodo proident tempor dolor. Irure eiusmod reprehenderit amet excepteur.\r\nDolor eu quis excepteur dolore esse veniam voluptate in sint culpa sunt consequat eu. Et sunt eiusmod veniam do labore id deserunt est ipsum. Magna enim sit do id reprehenderit dolor sint anim aliqua. Tempor voluptate do enim esse culpa reprehenderit. Anim commodo dolor laboris labore commodo voluptate veniam anim incididunt.\r\nEnim et est mollit pariatur consectetur quis. Culpa ut amet exercitation est exercitation consectetur consequat aute anim elit. Irure et do consequat irure enim esse reprehenderit aliqua irure voluptate mollit irure cupidatat ad. Id sunt laboris ea proident. Irure Lorem commodo Lorem laboris quis minim ea. Ea duis pariatur ipsum nostrud id fugiat dolor sunt nostrud anim laboris deserunt ex.\r\nUt commodo ex ex sit minim deserunt commodo enim anim tempor. Anim amet labore et sit aute elit commodo commodo duis commodo in. Commodo occaecat deserunt et irure tempor est esse eu. Do esse aliquip reprehenderit excepteur eiusmod. Laboris eu ullamco pariatur exercitation et reprehenderit et fugiat sint labore ad. Consequat anim elit in sunt reprehenderit voluptate sint ut elit qui amet nisi.\r\n",
    "date": "Thu May 20 2021 17:40:26 GMT+0200 (Central European Summer Time)",
    "star": false,
    "id": "60a7945d9460725d081f6237",
    "category": "CAT3",
    "important": true
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    emailService = new EmailService(httpClient);
  });

  it('should be created', () => {
    expect(emailService).toBeTruthy();
  });

  it('should return list of emails', () => {

    emailService.getAllEmails().subscribe(emails => {
      expect(emails?.length).toEqual(26);
    });

    const req = httpTestingController.expectOne('./assets/dummy.data.json');
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();
  });

  it('should return the email by ID', () => {
    emailService.getEmailById("60a7945d9460725d081f6237").subscribe(email => {
      expect(email.title).toEqual("Cillum sint incididunt consectetur deserunt");
      expect(email.from).toEqual("lindsaymacdonald@waterbaby.com");
      expect(email.category).toEqual("CAT3");
      expect(email.important).toEqual(true);
    });

    const req = httpTestingController.expectOne('./assets/dummy.data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(testEmail);
    httpTestingController.verify();
  });

  it('should return list of emails of a category', () => {
    emailService.getEmailsByCategory("primary").subscribe(emails => {
      expect(emails.length).toEqual(12);
    });

    const req = httpTestingController.expectOne('./assets/dummy.data.json');
      expect(req.request.method).toEqual('GET');
      req.flush({testData});
      httpTestingController.verify();
  });

  it('should return list of emails of a type', () => {
    emailService.getEmailsByType("starred").subscribe(emails => {
      expect(emails.length).toEqual(9);
    });

    const req = httpTestingController.expectOne('./assets/dummy.data.json');
      expect(req.request.method).toEqual('GET');
      req.flush({testData});
      httpTestingController.verify();
  });

});
