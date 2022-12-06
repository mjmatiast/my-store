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
Implementando slides

5
Solicitudes POST

6
Solicitudes PUT y PATCH

7
Solicitudes DELETE

8
Url Parameters / Paginación

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
