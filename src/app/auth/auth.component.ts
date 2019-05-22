import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
@Component({
 selector: 'app-auth',
 templateUrl: './auth.component.html',
 styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
 loginUserData = {}
 constructor(private dbService: DataService) { }
 ngOnInit() {
 }
 onLogin() {
   this.dbService.loginUser(this.loginUserData)
     .subscribe(
       res => console.log(res),
       err => console.log(err),
     );
 }
 onLogout() {
   this.dbService.logoutUser();
   window.location.reload();
 }
 
}

