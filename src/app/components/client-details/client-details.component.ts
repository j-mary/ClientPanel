import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IClient } from 'src/app/_model/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: IClient;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clentService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessahe: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get Id
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.clentService.getClient(this.id).subscribe(client => {
      //set hasBalance
      if (client.balance > 0) this.hasBalance = true;
      this.client = client;
    })
  }

  onDeleteClick() {
    // delete a client
  }

}
