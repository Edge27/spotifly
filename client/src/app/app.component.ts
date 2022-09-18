import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  providers:[UserService]
})
export class AppComponent {
  public title = 'Spoti-FLY';
  public user: User;
  public identity = false;
  public token;
  
  constructor(private _userService:UserService){
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    //var texto = this._userService.singup();
    //console.log(texto);
  }

  public onSubmit(){
    console.log(this.user);
    this._userService.singup(this,this.user).subscribe(
      response =>{
        console.log (response);
        let identity = response.user;

      },error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          console.log(error);
        }
      });
  }
}
