import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';
// import { games } from '../games/games.component';

@Component({
  selector: 'app-game-create',
  templateUrl: './gamecreate.component.html',
  styleUrls: ['./gamecreate.component.css']
})
export class GameCreateComponent implements OnInit {
  games= [];
  createData: any;
  title: string;
  // @Output() refresh = new EventEmitter();

  constructor(
    private dbService: DataService,
    public modalRef: BsModalRef,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
  }

  addGame = () => {
    fetch('http://localhost:3005/games/addgame', {
      method: "POST",
      body: JSON.stringify(this.createData),
        // {"name":"", "cover":"","platform":"","rating":1, "genre":"", "contentrating":"","description":""}),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      })
    })
      .then(res => res.json())
       .then(gameData => {
        console.log(this.createData);
  
      });
  };

  onCreate() {
    this.dbService.gamecreate(this.createData)
      .subscribe(
        res => {
          // console.log(res);
          this.closeModal();
          location.href = window.location.href
          // this.refresh.emit();
        },
        err => console.log(err)
      )
  }

  // onEdit(id: any) {
  //   this.dbService.gameedit(this.createData, id)
  //     .subscribe(
  //       res => {
  //         // console.log(res);
  //         this.closeModal();
  //         if(res){
  //           document.getElementById(`crud-action_${id}`).innerHTML = 'updated';
  //           setTimeout(() => {
  //             document.getElementById(`crud-action_${id}`).innerHTML = '';
  //           }, 2500);
  //           setTimeout(() => {
  //             location.href = window.location.href
  //             // this.refresh.emit();
  //           }, 2550);
  //         }
  //       },
  //       err => console.log(err)
  //     )
  // }

  updateGame(name){
    // data.owner= Number(localStorage.getItem('id'))
    console.log('game data:',name)
    //return this.http.put(`https://coffeeredbadgeserver.herokuapp.com/comment/77`,data,httpOptions)
    return fetch(`http://localhost:3005/games/editgame/${name}`,{
      method: 'PUT',
      body: JSON.stringify(this.createData),
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
    }).then(res=>console.log(res))
   }
  

  onEdit(name: any) {
    this.dbService.gameedit(this.createData, name)
      .subscribe(
        res => {
          // console.log(res);
          this.closeModal();
          if(res){
            document.getElementById(`crud-action_${name}`).innerHTML = 'updated';
            setTimeout(() => {
              document.getElementById(`crud-action_${name}`).innerHTML = '';
            }, 2500);
            setTimeout(() => {
              location.href = window.location.href
              // this.refresh.emit();
            }, 2550);
          }
        },
        err => console.log(err)
      )
  }

  closeModal(){
    this.modalRef.hide();
  }

}
