import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IClient } from '../_model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client: Observable<any>;
  clients: Observable<any[]>;

  constructor(public af: AngularFireDatabase) {
    this.clients = af.list<IClient>('/clients')
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      }))
  }

  getClients() {
    return this.clients;
  }

  newClient(client: IClient) {
    const clientRef = this.af.list<IClient>('clients');
    clientRef.push(client);
  }

  getClient(id: string) {
    this.client = this.af.object<IClient>('clients/' + id).valueChanges();
    return this.client;
  }

}
