Curso de Consumo de APIs REST con Angular

1
# Lo que aprenderás para consumir API con Angular
## Otros temas que vas a explorar
Además de estos conocimientos también profundizarás en los siguientes temas:

## Buenas prácticas de desarrollo
Verbos HTTP
Conexión HTTP con API Rest
CORS
Manejo de ambientes en Angular
Autentificación
Seguridad y tokens
Manejo avanzado de Observables con RxJS
Descarga y subida de archivos

2 
# Solicitudes GET

El verbo HTTP GET en JavaScript suele utilizarse para la obtención de datos. Por ejemplo, una lista de productos o el detalle de un único producto en particular.

Pasos para el consumo de API con Angular
El primer paso para el consumo de API con Angular es la importación del módulo correspondiente y los servicios, luego sigue la siguiente guía para proceder en tu camino.

1. Importa los módulos
Asegúrate de importar HttpClientModule en el módulo principal de tu proyecto.

```ts

// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
export class ProductComponent
  @Input () product: Product =
     id: ,
     price: 0,
     images: [],
    title:
    category:
       id:
      name:
    description: ''
  @Output() addedProduct = new EventEmitter<Products();

```
2. Crea un servicio en tu proyecto
Crea un servicio en tu proyecto que será el responsable de todas las peticiones HTTP que tu aplicación necesite. Dicho servicio tiene que importar el cliente HTTP de Angular HttpClient para realizar los llamados a una API.
```ts
// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://example.com/api/productos`);
  }
}
```
```ts
// components/catalogo/catalogo.component.ts
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  public productos: Producto[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getProducts()
      .subscribe(res => {
        this.productos = res;
      });
  }
}
```
3. Importa los componentes
Importa el nuevo servicio en el componente que necesite realizar peticiones HTTP.

```ts
// components/catalogo/catalogo.component.ts
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  public productos: Producto[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getProducts()
      .subscribe(res => {
        this.productos = res;
      });
  }
}
```
3
# Detalle de producto
La solicitudes GET suelen utilizarse tanto para obtener un conjunto de registros, como para obtener uno solo. A continuación conocerás más sobre el proceso para crear una aplicación.

Cómo obtener un producto por ID
Cuando necesites obtener datos de un registro individual a través de su ID, el endpoint correspondiente para la petición suele recibir esa información como parte de su URL, por ejemplo https://example.com/api/producto/12, para obtener el producto con ID 12.

No es del todo una buena práctica que un endpoint GET reciba datos por medio de un body. Es posible, pero no recomendable y no es natural en una API Rest. Tenlo en cuenta si eres tú quien desarrolla el backend también.

```ts

// services/api.service.ts
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://example.com/api/productos`);
  }

  getProduct(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`https://example.com/api/productos/${idProduct}`);
  }
}

```
En el servicio para realizar las peticiones HTTP, el método getProduct() recibe el ID como parámetro para concatenarlo a la URL.

Simulando una API
Si no tienes a disposición una API real para construir tu App, puedes simular peticiones HTTP en Angular con lo que se conoce como mock de datos. Un objeto que mantiene la estructura de datos real que tendrá la información de tu aplicación.

```ts
// services/api.service.ts
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getProduct(idProduct: string): Observable<Product> {
    return of(
      {
        id: 1,
        name: 'Automobil de juguete',
        precio: 100,
        image: 'https://static3.depositphotos.com/1000865/118/i/600/depositphotos_1183767-stock-photo-toy-car.jpg'
      }
    );
  }

}
```
Utilizando la función of importándola desde RxJS, esta función convierte lo que sea que le envíes como parámetro, en un observable.

4
# Implementando slides

Una necesidad crucial cuando se trabaja con Angular es la importación de componentes de terceros para un rápido desarrollo y utilización de los mismos.

Cómo importar componentes de terceros
Anímate a crear un carrusel de imágenes utilizando librerías como SwiperJS. Luego, instala la dependencia con el comando npm i swiper e impórtala en el módulo principal de tu aplicación para que esté lista para utilizarse.
```ts

import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [SwiperModule],
})
export class AppModule {}
```
Es importante que sepas importar y utilizar este tipo de componentes ya listos para ser utilizados y agilizar así el desarrollo de cualquier aplicación.

API de Prueba
Existen muchas API gratuitas que puedes utilizar para practicar y construir aplicaciones, te comparto las más populares para que las investigues

MockAPI
OpenWeather
Pokémon API
The Rick and Morty API
Anímate a explorar estas API y diviértete desarrollando aplicaciones y practicando todo lo que ya sabes sobre Angular hasta aquí. Más adelante en el curso verás cómo potenciar el consumo de API con Angular y sacarle mayor provecho a este framework.

5
# Solicitudes POST
Llega el momento de crear registros a través de una API y para esto, siempre se utiliza el verbo HTTP POST.

Tipado de Peticiones HTTP
Descubre a continuación cómo utilizar el cliente HTTP de angular para tipar tu solicitiud GET y crear un producto.

1. Crea interfaces para tipar el producto y su categoría
Siempre es aconsejable tipar los datos y evitar el uso del tipo any, ya que aumenta la posibilidad de errores en tu aplicación. Para esto, creamos varias interfaces para tipar el Producto y la Categoría del producto:
```ts
// interfaces producto.interface.ts
export interface Category {
  idCategory: string;
  category: string;
}
export interface Product {
  id: number;
  name: string;
  precio: number;
  description: string;
  image: string;
  category: Category;
}
```
Observa que la interfaz de Producto tiene un ID y una Category. Normalmente, una petición POST no recibe una ID ni tampoco un objeto del tipo category. El ID es autogenerable en la base de datos y la categoría suele recibirse solo el identificador de la misma.

2. Genera otra interfaz Producto
Para solucionar esto, puedes crear otra interfaz y gracias a características propias de TypeScript, puedes extender el uso de la interfaz Producto y omitir los campos que no sirven para una petición POST.
```ts
// interfaces producto.interface.ts
export interface CreateProducto extends Omit<Product, 'id' | 'category'> {
  idCategory: string;
}
3. Logra tipar por completo tu solicitud POST
Ahora es posible tipar por completo tu solicitud POST. Tanto los datos que envías en el body de la petición como los datos que recibirás en la respuesta.

// services/api.service.ts
import { CreateProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  createProduct(body: CreateProducto): Observable<Producto> {
    return this.http.post<Producto>(`https://example.com/api/productos`, body);
  }
}

```
4. Importa los servicios e interfaces
Desde tu componente puedes importar el servicio, las interfaces que necesites y podrás crear los objetos y realizar la petición POST para crear el Producto.
```ts
// components/catalogo/catalogo.component.ts
createProduct(): void {
  const body: CreateProducto = {
    name: 'Nuevo producto',
    precio: 100,
    description: 'Descripción del producto',
    image: 'https://example.com/image',
    idCategory: '1'
  };
  this.apiService.createProduct(body)
    .subscribe((p: Product) => {
        // Guardamos el nuevo producto, en el Array de productos junto con los otros.
        this.productos.push(p);
    });
}
```
Este tipo de endpoints suele recibir un body con los datos que necesita el registro para construirse. En caso de éxito, el mismo tiene que devolver el objeto recientemente insertado en la base de datos para actualizar inmediatamente el front-end.

6
# Solicitudes PUT y PATCH

7
# Solicitudes DELETE

8
# Url Parameters / Paginación

9
Observable vs. Promesa

10
Reintentar una petición

Buenas prácticas

11
El problema de CORS

12
Manejo de ambientes

13
Manejo de errores

14
Transformar peticiones

15
Evitando el callback hell

Auth

16
Login y manejo de Auth

17
Manejo de headers

18
Uso de interceptores

19
Enviar Token con un interceptor

20
Creando un contexto a interceptor

Archivos

21
Descarga de archivos con Http

22
Subida de archivos con Http

Despedida

23
Continúa con el Curso de Angular Router y Programación Modu
