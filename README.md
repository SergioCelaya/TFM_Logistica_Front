
# TFM - TOTAL FACILITY MANAGMENT 

Este manual de software de gestión logística presenta una solución integral para optimizar y perfeccionar los procesos logísticos dentro de nuestra empresa. Diseñado con la premisa de mejorar la eficiencia operativa, aborda las complejidades de la cadena de suministro, proporcionando herramientas avanzadas y soluciones tecnológicas.

## Requisitos mínimos

- Formulario para poder acceder a la aplicación dependiendo del perfil que se tenga dentro de la empresa.
- Página principal con los siguientes datos, dependiendo del perfil del usuario:
    - Operario: listado de pedidos activos y pasados a su cargo, así como la posibilidad de crear nuevos pedidos.
    - Encargado: listado de pedidos de entrada y salida de su almacén. Dispone de la posibilidad de revisar cualquier tipo de pedido sin editarlo para marcar si están correctos o no.
    - Jefe: formularios de registro, tanto de nuevos empleados como de nuevos almacenes. Posibilidad de asignar a los usuarios perfiles y almacenes dependiendo de las diferentes necesidades.
- Los pedidos solo pueden ser creados y editados por los operarios de camión.
- En el momento que el operario determina que el pedido está listo para salir lo envía para Revisión, modificando así su estado.
- Cuando el encargado recibe el aviso de un nuevo pedido para revisión podrá comprobar sus detalles y marcarlos como Listo o por contra enviarlo de nuevo al operario con un comentario para su revisión.
- El mismo flujo de trabajo se debe llevar a cabo cuando un operario hace entrega de un pedido.

## Deseables

- Sistema de envío de email para determinar los diferentes cambios de estado de los pedidos.
- Inclusión de mapa interactivo dentro del detalle del pedido para especificar al operario la mejor ruta para la entrega del pedido.

## Requisitos técnicos

- Framework de FrontEnd: Angular.
 
- Base de datos, dependiendo las necesidades del proyecto, podrá ser elegida entre MongoDb y MySQL.
 
- Backend la aplicación la realizaremos en NodeJS con Express.

## 🗄️ Estructura del Front:

```
└── 📁TFM_Logistica_Front
    └── .DS_Store
    └── 📁.angular
    └── .editorconfig
    └── 📁.vscode
    └── Manual-TFM.pdf
    └── README.md
    └── angular.json
    └── package-lock.json
    └── package.json
    └── 📁src
        └── .DS_Store
        └── 📁app
            └── app.component.css
            └── app.component.html
            └── app.component.ts
            └── app.module.ts
            └── 📁components
                └── 📁detalle
                    └── 📁detalle-empleado
                        └── detalle-empleado.component.css
                        └── detalle-empleado.component.html
                        └── detalle-empleado.component.ts
                    └── 📁detalle-incidencia
                        └── detalle-incidencia.component.css
                        └── detalle-incidencia.component.html
                        └── detalle-incidencia.component.ts
                    └── 📁detalle-pedido
                        └── detalle-pedido.component.css
                        └── detalle-pedido.component.html
                        └── detalle-pedido.component.ts
                └── 📁forms
                    └── 📁form-almacen
                        └── form-almacen.component.css
                        └── form-almacen.component.html
                        └── form-almacen.component.ts
                    └── 📁form-empleado
                        └── form-empleado.component.css
                        └── form-empleado.component.html
                        └── form-empleado.component.ts
                    └── 📁form-incidencias
                        └── form-incidencias.component.css
                        └── form-incidencias.component.html
                        └── form-incidencias.component.ts
                    └── 📁form-pedido
                        └── form-pedido.component.css
                        └── form-pedido.component.html
                        └── form-pedido.component.ts
                └── 📁incidencia
                    └── incidencia.component.css
                    └── incidencia.component.html
                    └── incidencia.component.ts
                └── 📁listas
                    └── 📁lista-almacenes
                        └── lista-almacenes.component.css
                        └── lista-almacenes.component.html
                        └── lista-almacenes.component.ts
                    └── 📁lista-empleados
                        └── lista-empleados.component.css
                        └── lista-empleados.component.html
                        └── lista-empleados.component.ts
                    └── 📁lista-incidencias
                        └── lista-incidencias.component.css
                        └── lista-incidencias.component.html
                        └── lista-incidencias.component.ts
                    └── 📁lista-pedidos
                        └── lista-pedidos.component.css
                        └── lista-pedidos.component.html
                        └── lista-pedidos.component.ts
                └── 📁mapa-pedido
                    └── mapa-pedido.component.css
                    └── mapa-pedido.component.html
                    └── mapa-pedido.component.ts
                └── 📁menu
                    └── menu.component.css
                    └── menu.component.html
                    └── menu.component.ts
                └── 📁new-incidencia
                    └── new-incidencia.component.css
                    └── new-incidencia.component.html
                    └── new-incidencia.component.ts
                └── 📁pedido
                    └── pedido.component.css
                    └── pedido.component.html
                    └── pedido.component.ts
            └── 📁guards
                └── administrador.guard.ts
                └── combinado.guard.ts
                └── empleado.guard.ts
                └── encargado.guard.ts
            └── 📁interceptors
                └── auth.intereceptor.service.ts
            └── 📁media
                └── logo.png
            └── 📁models
                └── 📁Respuestas_API
                    └── allEmpleados.interface.ts
                    └── allIncidencias.interface.ts
                    └── allPedidos.interface.ts
                    └── auth.interface.ts
                    └── empleadoRespuesta.interface.ts
                    └── incidenciaRespuesta.interface.ts
                    └── paginacionRespuesta.interface.ts
                    └── pedidosRespuesta.interface.ts
                └── almacen.interface.ts
                └── correo.interface.ts
                └── empleado.interface.ts
                └── estado.interface.ts
                └── incidencia.interface.ts
                └── pedido.interface.ts
                └── user.interface.ts
            └── 📁pages
                └── 📁almacenes
                    └── almacenes.component.css
                    └── almacenes.component.html
                    └── almacenes.component.ts
                └── 📁empleados
                    └── empleados.component.css
                    └── empleados.component.html
                    └── empleados.component.ts
                └── 📁incidencias
                    └── incidencias.component.css
                    └── incidencias.component.html
                    └── incidencias.component.ts
                └── 📁login
                    └── login.component.css
                    └── login.component.html
                    └── login.component.ts
                └── 📁pedidos
                    └── pedidos.component.css
                    └── pedidos.component.html
                    └── pedidos.component.ts
            └── 📁services
                └── almacen.service.ts
                └── auth.service.ts
                └── correo.service.ts
                └── empleados.service.ts
                └── imagenes.service.ts
                └── incidencias.service.ts
                └── pedidos.service.ts
        └── 📁assets
            └── 📁estados
                └── crear.jpg
                └── enTransito.jpg
                └── finalizado.jpg
                └── pendienteRecepcionar.jpg
                └── pendienteRevisar.jpg
                └── rectificar.jpg
                └── validado.jpg
            └── fondo.jpg
            └── formicon.png
            └── incidencia.png
            └── logoTFM.png
            └── user.png
            └── warehouse.png
            └── warehouse_destino.png
        └── favicon.ico
        └── index.html
        └── main.ts
        └── styles.css
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json
```


## 🔗 Tecnologías
### Front End
[![angular](https://img.shields.io/badge/Angular-0F0F11?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![bootstrap](https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 💻  Run Repository Locally

[![git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/) [![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

Clone the project

```bash
  git clone https://github.com/SergioCelaya/TFM_Logistica_Front
```

Go to the project directory

```bash
  cd TFM_Logistica_Front
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ng s
```


## ✍🏼 Authors ©️

- [@SergioCelaya](https://github.com/SergioCelaya)
- [@SoniaFlores](https://github.com/Sonia-Flores)
- [@ErnestoGuisado](https://github.com/ernestoguisado)
- [@AlbertoGlez](https://github.com/albegosu)


[Manual-TFM](Manual-TFM.pdf)
