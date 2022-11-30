import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://static.wikia.nocookie.net/dragonball/images/6/64/Final_Yamcha.png';
  
  onLoaded(){
    console.log('log padre')
  }
}

