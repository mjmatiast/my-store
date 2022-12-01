import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy} 
from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    console.log('change just new =>', this.img);
    //code
  }
  @Output() loaded = new EventEmitter();

  imageDefault = './assets/images/r6azul.jpg';

  counter = 0;
  counterFn: number | undefined
   
  constructor(){
    //before reder, corremos una vez  cada vez angular quiere construir una instancia de ese componente
    //No async
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(){
    //todos los imput se utlizan dentro de ngOnChange,  
    //corre multiples antes o durante del rendereizacion simpre y cuando detecte cambios en los imputs.
    //change inputs --times
    console.log('ngOnChanges', 'imgValue =>', this.img);
    
  }
  
  ngOnInit(): void {
    //corre antes de renderizar pero solo una vez cuando ya esta inicializado el componente, cosas async
    //aqui podemos correr async --once time
    console.log('ngOnInit', 'imgValue =>', this.img);
    this.counterFn = window.setInterval(()=> {
      this.counter += 1;
      console.log('run counter');
    }, 1000) 
  }

  ngAfterViewInit(){
    //after render, corre cuando todos los hijos de ese componente ya se han renderizado 
    //handler children
    console.log('ngAfterViewInit');
  }
  ngOnDestroy() {
    //corre cunado elimina este componente
    console.log('ngOnDestroy');
    window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }
  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit();
  }
}
