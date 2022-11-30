import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input('img') img: string = '';

  @Output() loaded = new EventEmitter();

  imageDefault = '';
   
  constructor(){}

  ngOnInit(): void {
     
  }

  imgError() {
    this.img = this.imageDefault;
  }
  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit();
  }
}
