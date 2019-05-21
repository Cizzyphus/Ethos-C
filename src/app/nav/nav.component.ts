import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appTitle: string = 'Ethos';

  constructor(private data: DataService) {}
  public _auth: boolean = false;
  ngOnInit() {
    this._auth = localStorage.getItem('token') ? true : false;
  }

}
