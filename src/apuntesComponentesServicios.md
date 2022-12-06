# Curso de Angular: Componentes y Servicios
## Componentes

### 1 Todo lo que aprenderás sobre componentes y servicios en Angular

### 2 ¿Qué son los componentes?

### 3 Uso de Inputs

### 4 Uso de Outputs

### 5 Componente para producto

### 6 Ciclo de vida de componentes

### 7 ngDestroy &amp; SetInput

### 8 Lista de productos

### 9 Componentes y Header

### 10 Implementando el sideMenu

### 11 Comunicación padre e hijo

## Servicios

### 12 Conociendo los servicios

### 13 ¿Qué es la inyección de dependencias?

### 14 Obteniendo datos de una API

## Pipes y Directives

### 15 Conociendo los pipes

### 16 Construyendo tu propio pipe

### 17 Conociendo las directivas

## Best practices

### 18 Reactividad básica

### 19 Guia de estilos de Angular y linters

## Despedida

### 20 Despedida
<!-- 
(\d{1,})\n(.*)

### $1 $2 -->
# Clase 1
## Componentes en Angular
## Comunicación entre componentes
## Ciclo de vida de un componente
## Servicios en Angular
## Inyección de dependencias
## Consumo de datos provenientes de una API
## Pipes y Directivas
## Recomendaciones antes de empezar
## Necesitarás tener instalado en tu ordenador NodeJS y NPM junto con el CLI de Angular para comenzar a trabajar. Además, te recomendamos:
## Tener un conocimiento básico de JavaScript, HTML y CSS.
## Saber qué es TypeScript y su diferencia con Javascript.
## Puedes repasar el Curso de Fundamentos de Angular para prepararte con los conceptos básicos antes de continuar.

# clase 2
Un componente es una pieza de software con una responsabilidad única y una estructura y funcionalidad determinada, además de ser reutilizable.

Es una manera de dividir tu aplicación de una forma escalable para no tener todo en un solo archivo. Por ejemplo, un componente para el header, otro para el footer, uno más para el menú, etc.

## Componentes en Angular
Puedes crear tu primer componente en Angular utilizando el comando ng generate component test-name o en su forma corta ng g c test-name.

## Esta acción creará los siguientes archivos:

my-test-name.component.html
my-test-name.component.ts
my-test-name.component.css
my-test-name.component.spec.ts
El archivo .html que será el template que tu componente utilizará.
El archivo .ts que contiene el código TypeScript y la lógica.
El archivo .css que contiene los estilos.
Si escogiste trabajar con un preprocesador de CSS, este archivo puede ser .scss, .sass o .less.
Finalmente, el archivo más extraño, .spec.ts que contiene el código de las pruebas unitarias que puedes escribir para automatizar el testing en tu componente.

Angular también importará automáticamente el componente creado en el archivo app.module.ts para que automáticamente puedas utilizarlo en tu aplicación.

```ts

import { TestNameComponent } from './test-name/test-name.component';

@NgModule({
  declarations: [
    ...
    TestNameComponent
  ],
  imports: [ ... ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
Partes de un componente Angular
El archivo con la extensión .ts es el componente principal de cualquier Angular.

import { Component } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.scss']
})
export class TestNameComponent {
    ...
}
```
Observa lo más importante, el decorador @Component().

Los decoradores alteran el comportamiento de una clase en Angular, para que el compilador de TypeScript interprete el código de la manera correcta y sepa que una clase es:

un componente,
un módulo,
un servicio,
una directiva, etc.
Este decorador es quién enlaza el componente con el archivo HTML y la hoja de estilos, además le otorga al componente un selector o un nombre para utilizarlo en tus templates.

# clase 3 
Para comunicar componentes, Angular hace uso de decoradores para intercambiar información entre un componente padre hacia un componente hijo y viceversa.

## Comunicando componentes
Para enviar información de padre a hijo, puedes utilizar el decorador @Input() para marcar una propiedad de una clase como punto de entrada de un dato.

<p style=‘text-align:center;’>
<img src=“https://cdn.document360.io/da52b302-22aa-4a71-9908-ba18e68ffee7/Images/Documentation/Screenshot from 2022-04-05 22-42-58.png” alt=“Envio de datos componente padre a hijo”>
</p>

```ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent {

  @Input() firstname: string;

  constructor() { }
}
```
Debes importar Input desde @angular/core para poder utilizar esta directiva e indicar que la propiedad firstname es un dato que el componente padre enviará.

Podrás inicializar el componente desde su padre y pasarle los inputs que este necesite de la siguiente manera:

<app-test-name>
    firstname="Platzi"
</app-test-name>
También puedes cambiar el nombre el Input especificando el nombre de la propiedad que quieras que este utilice al inicializar el componente.

...
    @Input('my-name') firstname: string;
...
<app-test-name>
    my-name="Platzi"
</app-test-name>

## Data binding en Inputs
El decorador @Input() detectará cualquier cambio en el dato y automáticamente actualizará su valor. Si ocurre algún evento en el componente padre que cambie el valor en el Input firstname, el componente hijo recibirá inmediatamente ese nuevo valor.

Input Set
Otra manera de utilizar la directiva @Input es de la siguiente manera:

    @Input() set saludar(firstname: string) {
        console.log('Hola', firstname)
    };
Observa que en esta oportunidad, cada vez que se envía un valor al @Input, se ejecutará la función saludar() que recibe como parámetro el valor que se le haya enviado.

De esta manera, puedes ejecutar la lógica que necesites dentro de esta función cada vez que el valor del @Inputcambia.

# clase 4
Así como el decorador @Input permite el envío de información desde un componente padre hacia un componente hijo, el uso de @Outputs permite lo contrario.

Comunicación hijo a padre
A partir de la emisión de un evento, el decorador @Output() permite enviar mensajes desde un componente hijo hacia el padre.

uso de outputs.png
Envío del mensaje
Para esto, se hace uso de la clase EventEmitter importándola desde @angular/core, para crear en tu componente una propiedad emisora de eventos.

```ts

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent {

  @Output() message = new EventEmitter<string>();

  constructor() { }
}
```
Decorando la propiedad con el @Output() y creando una instancia de EventEmitter podrás emitir un evento de la siguiente manera:

    ...
    emitirEvento() {
        this.message.emit('Hola soy Platzi');
    }
Llamando al método emit() de la instancia EventEmitter, se enviará el valor al componente padre que se encuentre escuchando el evento.

## Recepción del mensaje
Desde el componente padre, inicializa el componente hijo de la siguiente manera:

<app-test-name>
    (message)="recibirMensaje($event)"
</app-test-name>
Se “bindea” la propiedad emisora de eventos con () y se le pasa una función que se ejecutará cada vez que emita un evento.
Y en el componente padre:

```ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.less']
})
export class FatherComponent {

  constructor() { }
  
  recibirMensaje(event: Event) {
    console.log(event);
  }
}
```
La función recibirMensaje() posee un parámetro del tipo Event que contendrá el mensaje del componente hijo.

## clase 5

Existen muchas situaciones en donde deberás enviar información de un componente padre a su/s hijo/s, por eso, acá te mostraremos con un ejemplo cómo funciona el componente para producto.

## Comunicando componente padre a hijo
Un ejemplo real para el uso de la comunicación entre componente podría ser para renderizar N cantidad de productos de un catálogo.

## Paso 1: Comienza creando una interfaz para tipear el modelo de datos del Producto:

// interfaces/producto.interface.ts
```ts

export interface Producto {
    id: number;
    name: string;
    precio: number;
    image: string;
}
```
## Paso 2: Luego, impórtala en el componente Catálogo que será el componente padre en la comunicación.
```ts
// components/catalogo/catalogo.component.ts

import { Component } from '@angular/core';
import { Producto } from './producto.interface.ts';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {

  public productos: Producto[] = [
    {
        id: 1,
        name: 'Automobil de juguete',
        precio: 100,
        image: './image1.jpg'
    },
    {
        id: 2,
        name: 'Muñeca de trapo',
        precio: 180,
        image: './image2.jpg'
    },
    {
        id: 3,
        name: 'Pelota de futbol',
        precio: 120,
        image: './image3.jpg'
    }
  ];
}
```
## Paso 3: Este componente posee un array de productos para iterar en el HTML inicializando el componente <app-producto> por cada objeto en el array.
```ts 
<!-- components/catalogo/catalogo.component.html -->
<app-producto *ngFor="let p of productos"
    [producto]="p"
></app-producto>
```
## Paso 4: Finalmente, el componente hijo recibe el producto haciendo uso del decorador @Input() y apoyándose también de la interfaz para tipear los datos.
```ts
// components/producto/producto.component.ts
import { Component, Input } from '@angular/core';
import { Producto } from './producto.interface.ts';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() producto: Producto;
}
```
Pudiendo mostrar la información del producto en el template del componente hijo:
```ts
<!-- components/producto/producto.component.html -->
<div>
    <h2>{{ producto.name }}</h2>
    <img [src]="producto.image">
    <p>Precio: {{ producto.precio }}</p>
</div>
```
Será habitual tener la necesidad en tus proyectos de construir componentes más grandes o “contenedores” de muchos otros componentes repetitivos y más pequeños. Es importante buscar este desacople entre componentes de la mejor manera posible.

Ver código fuente del proyecto

# clase 6

Un componente pasa por varias etapas en su ciclo de vida. A través de hooks, puedes realizar una determinada acción cuando el componente es inicializado, cuando se dispara un evento, cuando se detecta un cambio, cuando el componente es destruido, etc.

A continuación, se detalla la secuencia de eventos y el orden de los mismos:

## ciclo de vida de componentes.png
Hooks más utilizados
Constructor
Como en toda clase en la programación orientada a objetos, el constructor es quien crea la instancia del objeto y sus dependencias.

Solo se ejecuta una vez antes del render del componente.
No tiene que utilizarse para procesos asincrónicos.
ngOnChanges
El hook ngOnChanges() se dispara cada vez que se produce un cambio de estado en el componente. Cuando una variable cambia de valor, por ejemplo o ante el cambio de valor de un Input.

Se ejecuta N cantidad de veces antes y durante el render del componente.
Puede emplearse para procesos asincrónicos.
ngOnInit
Es el hook más usado, ngOnInit() es ideal para cualquier solicitud de datos asincrónicos a una API para preparar el componente antes de renderizarlo.

Únicamente se ejecuta una vez, antes del render del componente.
Puede usarse para procesos asincrónicos.
ngAfterViewInit
Este hook únicamente se ejecuta una vez cuando el render del componente haya finalizado. Puede serte útil para realizar acciones programáticas que requieran que todo el HTML del componente ya este preparado.

Únicamente se ejecuta una vez después del render del componente.
ngOnDestroy
Finalmente, ngOnDestroy() se ejecutará cuando el componente es destruido, o sea, cuando ya no existe en la interfaz del navegador. Suele utilizarse para liberar espacios de memoria que el componente requiera.

## Usando hook
Los hooks de ciclo de vida de Angular, son interfaces que tienen que importarse desde @angular/core para implementarlos en la clase y así detectar los cambios en cada evento.
```ts
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent implements OnInit, AfterContentInit, OnDestroy {

  constructor() {
    console.log('1. Primero sucederá esto');
  }

  ngOnInit(): void {
    console.log('2. Luego esto');
  }
  
  ngAfterViewInit(): void {
    console.log('3. Seguido de esto');
  }
  
  ngOnDestroy(): void {
    console.log('4. Finalmente esto (cuando el componente sea destruido)');
  }
  
}
```
Cada hook tiene sus características y utilidades recomendadas dependiendo lo que necesitas ayer. Es importante seguir estas recomendaciones para buscar optimizar el rendimiento de tu aplicación.

# clase 7
El hook ngOnDestroy() & SetInput tiene una importancia clave para el cuidado de nuestra aplicación. Su funcionalidad más importante es la liberación de espacio en memoria de variables para que no se acumule. Si esto llegara a suceder en tu aplicación, la misma podría volverse lenta y tosca a medida que toda la memoria del navegador es ocupada.

Liberando espacio de memoria
Todo el ecosistema Angular está basado en observables para el manejo asincrónico.

Cada vez que utilices un subscribe() para escuchar la respuesta de algún evento asincrónico (por ejemplo, el llamado a una API), es relevante realizar el respectivo unsubscribe() para liberar ese espacio en memoria.

RxJS
RxJS (Reactive Extensions Library for JavaScript) es una popular librería de Javascript para el manejo de observables. Si trabajas con Angular esta librería será tu mejor amiga.

Observa el siguiente ejemplo donde primero se importa Subscription desde rxjs para tipar la variable suscription. Guardamos el observable para posteriormente darlo de baja. También importamos interval que devuelve el observable y genera un contador que emite una pulsación, en este ejemplo, cada 1000 milisegundos.
```ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent implements OnDestroy, OnInit {

    count = interval(1000);
    suscription!: Subscription;

    ngOnInit(): void {
        this.suscription = this.count.subscribe(d => {
          console.log("contando:", d);
        })
    }

    ngOnDestroy(): void {
        this.suscription.unsubscribe();
    }

}
```
En el ngOnInit(), se está suscribiendo a la propiedad this.count para imprimir por consola, cada 1000 milisegundos, el contador. Podrás observar en la consola del navegador el contador corriendo:

ngDestroy & SetInput.png
Si nuestro código acabara aquí, cuando el componente es destruido, el contador continuaría ocupando memoria que ya no debería ser utilizada.

Para solucionar esto, guardamos en this.suscription el observable del contador y en ngOnDestroy() y llamamos al método .unsubscribe() para detener el contador.
# clase 8
Haciendo uso de los decoradores de Angular para comunicar componentes. Puedes crear una lista de productos y con unas pocas líneas de CSS crear un layout para visualizar los productos de una forma más agradable.

## Comunicando con múltiples componentes hijos
Haciendo uso de un ngFor, puedes crear y comunicarte con N cantidad de componentes hijos. Veamos un ejemplo:

## Paso 1: Crea una interfaz para tipear el modelo de datos del Producto.
```ts
// interfaces/producto.interface.ts
export interface Producto {
    id: number;
    name: string;
    precio: number;
    image: string;
}
Paso 2: Impórtala en el componente catálogo que será el componente padre en la comunicación.

// components/catalogo/catalogo.component.ts
import { Component } from '@angular/core';
import { Producto } from './producto.interface.ts';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {

  public productos: Producto[] = [
    {
      id: 1,
      name: 'Automobil de juguete',
      precio: 100,
      image: 'https://static3.depositphotos.com/1000865/118/i/600/depositphotos_1183767-stock-photo-toy-car.jpg'
    },
    {
      id: 2,
      name: 'Muñeca de trapo',
      precio: 180,
      image: 'https://kinuma.com/8869-home_default/muneca-de-trapo-mali.jpg'
    },
    {
      id: 3,
      name: 'Pelota de futbol',
      precio: 120,
      image: 'https://media.istockphoto.com/photos/soccer-ball-isolated-3d-rendering-picture-id1257575611?k=20&m=1257575611&s=612x612&w=0&h=g530fFJspT42xFGY7HycLvpBKLXpJ2XAkKCRyY-SK80='
    },
    {
      id: 4,
      name: 'Castillo',
      precio: 220,
      image: 'https://i.imgur.com/44nzvkQ.jpg'
    }
  ];

  constructor() { }
}
```
## Paso 3: l componente catálogo posee un array de productos para iterar en el HTML inicializando el componente <app-producto> por cada objeto en el array.

<!-- components/catalogo/catalogo.component.html -->
<h1>Catálogo Platzi</h1>
<div class="catalogo">
    <app-producto *ngFor="let p of productos"
        [producto]="p"
    ></app-producto>
</div>

## Paso 4: El componente hijo recibe el producto haciendo uso del decorador @Input() y apoyándose también de la interfaz para tipear los datos.
```ts

// components/producto/producto.component.ts
import { Component, Input } from '@angular/core';
import { Producto } from './producto.interface.ts';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() producto: Producto;

  constructor() { }
}
```
Pudiendo mostrar la información del producto en el template del componente hijo:

<!-- components/producto/producto.component.html -->
<div>
    <h2>{{ producto.name }}</h2>
    <img [src]="producto.image">
    <p>Precio: {{ producto.precio }}</p>
</div>

## Paso 5: En este punto, los productos quedarán uno debajo del otro. Con un poco de Flex Box en la hoja de estilos del catálogo, puedes presentar los productos uno al lado del otro:
```ts
.catalogo {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
```
Quedando de la siguiente manera:
lista de productos.png

Ya luego podrás darle los mejores estilos de acuerdo al diseño aplicando CSS en la hoja de estilos del producto.

# CLASE 9 

Componente “header”
Anímate a crear una barra de navegación sencilla. Para generar un componente, recuerda utilizar el comando ng g c del CLI de Angular.

Paso 1: Escribe el código HTML de tu template 

```ts

<header class="header">
    <a href="#" class="logo">CompanyLogoa>
    <div class="header-right">
        <a href="#">Homea>
        <a class="active" href="#">Catalogoa>
        <a href="#">Abouta>
    div>
header>
Paso 2: Agrega el CSS correspondiente en la hoja de estilos del componente.

/* components/nav-bar/nav-bar.component.scss */
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
  a {
    float: left;
    color: black;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    border-radius: 4px;
    &.logo {
      font-size: 25px;
      font-weight: bold;
    }
  }
  a:hover {
    background-color: #ddd;
    color: black;
  }
  a.active {
    background-color: dodgerblue;
    color: white;
  }
  .header-right {
    float: right;
  }
}

/* Header Mobile */
@media screen and (max-width: 512px) {
  .header {
    a {
      float: none;
      display: block;
      text-align: left;
    }
    .header-right {
      float: none;
    }
  }
}
Paso 3: Para tener tu header responsive, has uso de Media Queries para lograr que la aplicación se adapte a cualquier tamaño de pantalla.

componente header.png{height="" width=""}

```
# 10 
A la hora de implementar el sideMenu recuerda siempre la importancia de que una aplicación web sea responsive para que pueda adaptarse a cualquier dispositivo, ya sea un celular, una tablet o un ordenador.

Menú mobile
Utilizando el estado de los componentes de Angular, podrás mostrar un menú lateral solo en dispositivos pequeños.

Paso 1: Comienza dividiendo tu <header> adaptándolo con CSS para mostrar u ocultar elementos dependiendo el tamaño del dispositivo:
```ts
<!-- components/nav-bar/nav-bar.component.html -->
<header class="header">
    <div class="d-flex-mobile">
        <a href="#" class="logo">CompanyLogo</a>
        <div class="show-side-menu">
            <app-side-bar></app-side-bar>
        </div>
    </div>
    <div class="header-right hidde-menu">
        <a href="#">Home</a>
        <a class="active" href="#">Catalogo</a>
        <a href="#">About</a>
    </div>
</header>
/* components/nav-bar/nav-bar.component.scss */
.header {
  /* ... */
  .show-side-menu {
    display: none;
  }
}

/* Header Mobile */
@media screen and (max-width: 512px) {
  /* ... */
  .d-flex-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .show-side-menu {
    display: block;
  }
  .hidde-menu {
    display: none;
  }
}
Paso 2: Crea el componente que será la barra de navegación lateral:

// components/side-bar/side-bar.component.ts
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  public showMenu = false;

  toggleSideBar(): void {
    this.showMenu = !this.showMenu;
  }

}
<!-- components/side-bar/side-bar.component.html -->
<div id="main">
    <button class="openbtn" (click)="toggleSideBar()">☰</button>
</div>
<div id="mySidebar" class="sidebar" [ngClass]="this.showMenu ? 'showMenu' : ''">
    <a href="javascript:void(0)" class="closebtn" (click)="toggleSideBar()">×</a>
    <a href="#">Home</a>
    <a class="active" href="#">Catalogo</a>
    <a href="#">About</a>
</div>
/* components/side-bar/side-bar.component.scss */
.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f1f1f1;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  box-shadow: 0 3px 6px #00000029;

  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 22px;
    color: black;
    display: block;
    transition: 0.3s;
  }
  .active, a:hover {
    color: #98ca3f;
  }
  .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
}
.openbtn {
  cursor: pointer;
  font-size: 20px;
  color: black;
  background-color: #f1f1f1;
  padding: 10px 15px 15px 15px;
  border: none;
}
#main {
  transition: margin-left .5s;
  padding: 12px;
}
@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
.showMenu {
  width: 250px;
}
Paso 3: Fíjate en la función toggleSideBar() que activará o desactivará el menú lateral al hacer clic en el botón.

side menu.png{height="" width=""}
```

```ts
// se extiende a omit cuando queres excluir atributos que no es necesario mandar desde el modelo con un post
export interface CreateProductDTO extends Omit<Product, 'id' I 'category'> {
  categoryId: number;
```


