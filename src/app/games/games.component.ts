import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Games } from '../games/models/game.model';
import { DataService } from '../data.service';
import { GameCreateComponent } from '../gamecreate/gamecreate.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent {
  // title: string = 'Ethos';
  // _dropdown: string = '';
  // _searchField: string = '';
  // data: object = {};
  // games: any = [];
  // display: object = {};
  // baseUrl = 'http://localhost:3005';
  games= [];
  gameData={};
  createData: any;
  modalRef: BsModalRef;
  title: string;
  showComments: any;
  owner = Number(localStorage.getItem('uid'));

  
  
  constructor(private data: DataService,
    private modalService: BsModalService) {} 
  public _auth: boolean = false;

  ngOnInit() {
      this._auth = localStorage.getItem('token') ? true : false;
   
  //     ().subscribe(data => {
  //     this.games= data
  //     console.log(this.games);
  // })
}
// componentDidMount() {
//   this.fetchGames();
// }

updateGame = () => {
  fetch('http://localhost:3005/games/editgame', {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    })
  })
    .then(res => res.json())
    .then(gameData => {
      this.games=gameData;
      console.log(gameData)

    });
};

addGame = () => {
  fetch('http://localhost:3005/games/addgame', {
    method: "POST",
    body: JSON.stringify( this.data.gamecreate(this.createData)),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    })
  })
    .then(res => res.json())
    .then(gameData => {
      this.games=gameData;
      console.log(gameData)

    });
};


fetchGames = () => {
  fetch('http://localhost:3005/games/viewgames', {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    })
  })
    .then(res => res.json())
    .then(gameData => {
      this.games=gameData;
      console.log(gameData)
      console.log(this.createData)

    });
};

getGames() : void {
  this.data.getGames().subscribe(Games => {
    this.games = Games;
  })
}

// addSubmit = event => {
//   event.preventDefault();
//   fetch ('http://localhost:3005/games/viewgames'), {
//     method: "POST",
//     body: JSON.stringify( this.state ),
//     headers: new Headers({
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("token")
//     })
//   }
//     .then(res => res.json())
//     .then(gameData => {
//       // after we create a log we want to pull that data from the server.
//       // this.props.updateMoviesArray();
//       // this.state.sessionToken();
//       this.setState({
//         name: "",
//         rating: "",
//         genre: "",
//         contentrating: "",
//         runtime: "",
//         description: ""
//       });
//       console.log(gameData);
//     })
//     .catch(err => console.log(err.message));
// };

name : string;

onDeleteGame(name) {
  console.log('delete product name: '+name)
  this.data.deleteGame(name).subscribe(
    res => console.log(res),
    err => console.log(err)
  );
  this.getGames();
  // location.href=location.href;
  this.fetchGames();
}

openModal() {
  this.modalRef = this.modalService.show(GameCreateComponent,  {
    initialState: {
      title: 'Ethos Wizard',
      createData: this.createData
    }
  });
}

onCreate() {
  this.data.gamecreate(this.createData)
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
closeModal(){
  this.modalRef.hide();
}


openCreate(name: any) {
    
  if (!name){
    this.title = 'Add Game'
    this.createData = {
      name: null,
      cover: null,
      platform: null,
      contentrating: null,
      rating: null,
      genre: null,
      description: null,
    }
    this.openModal();

  } else {
    this.title = 'Edit Product';
    this.data.getGame(name).subscribe(
    data => {
            // this.createData = data;
            this.openModal();
          }
    )
}
}



openDelete(id: any) {
this.data.getGame(id).subscribe(
  data => {
          //console.log(data);
          this.createData = data
          this.openDeleteModal(id)
        }
)
window.location.reload();
}

openDeleteModal(name: any) {
this.modalRef = this.modalService.show(GameCreateComponent,  {
  initialState: {
    title: 'Delete this?',
    createData: this.createData
  }
});
}

  // constructor(
  //   private http: HttpClient) { }

// onEnter(dropdown: string, searchField: string) {
//     this._dropdown = dropdown.valueOf();
//     this._searchField = searchField;
//     return (this.http.get(`${this.baseUrl}/${this._dropdown}/?search=${this._searchField}`))
//     .subscribe(results => {
//       this.games = results;
//       console.log(this.games)
//     })
//   }
}
