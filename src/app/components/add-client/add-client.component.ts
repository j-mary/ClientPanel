import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/_model/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: IClient = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: IClient, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this._flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['add-client']);
    } else {
      // Add new client
      this.clientService.newClient(value);
      // Display flash message
      this._flashMessagesService.show('New Client Added', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['add-client']);
      // navigate to dashboard
      this.router.navigate(['/'])
    }
  }

}
