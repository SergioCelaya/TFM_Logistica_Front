
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


## Authors ©️

- [@SergioCelaya](https://github.com/SergioCelaya)
- [@SoniaFlores](https://github.com/Sonia-Flores)
- [@ErnestoGuisado](https://github.com/ernestoguisado)
- [@AlbertoGlez](https://github.com/albegosu)


[Manual-TFM](Manual-TFM.pdf)
