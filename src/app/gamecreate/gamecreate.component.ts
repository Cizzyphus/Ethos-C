import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-game-create',
  templateUrl: './gamecreate.component.html',
  styleUrls: ['./gamecreate.component.css']
})
export class GameCreateComponent implements OnInit {
  gamess: any;
  createData: any;
  title: string;
  // @Output() refresh = new EventEmitter();

  constructor(
    private dbService: DataService,
    public modalRef: BsModalRef,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
  }

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
