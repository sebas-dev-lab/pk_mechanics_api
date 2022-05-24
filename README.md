# pk_mechanics_api
API with Typescript - Express - MySQL

## Requerimientos

- Instalar Node.js
- Instalar Docker & Docker Compose
- Instalar Newman: npm install -g newman
- Instalar Newman Reports html: npm i -g newman-reporter-htmlextra
- .env con variables por default para docker-compose

-  **Si se trabaja sin docker entonces:**
    - Instalar MySQL
    - Modificar .env con credenciales correspondientes // ver en changelogs/envs/local.env => copiar y pegar en .env de la raiz de proyecto.


## Descripcion

- El proyecto se puede levantar localmente ya sea con/sin docker-compose, en el primer caso no es necesario instalar MySQL ya que se creara un contenedor con MySQL y otro donde se alojara la api.
- Proyecto testeado en Kali Linux y Windows 10.
- Ver changelogs/testReports. Importar json a postman para poder probar.
- El proyecto inicializa y carga datos basicos. Esta configurado para que al reiniciar el servidor se eliminen y vuelvan a recargar los datos. Por lo tanto, los datos previos se perderan. Para evitar esto, si se requiere, en config/server/Server.ts linea 67, pasar {force:true} a  {force:false} y recomiendo eliminar la funcion pasada por parametro en index.ts.


## Testing POSTMAN/NEWMAN
> Ver en changelogs/testReports
- se puede acceder al ultimo test desde el navegador http://localhost:8090/
- Version de la api en  http://localhost:8090/api/v1/version
- env.json (variables de entorno) exportado de postman
- test.json (requests) exportado de postman
- Ambos pueden ser importados a postman
- run.sh script que corre newman con el siguiente comando:

```
sh run.sh

```
- primero se debe levantar el proyecto y luego correr el test.
- el reporte se encuentra en /newman/Test_<"Date">.html

## Instalacion
```
clonar repo
npm install

```
## Iniciar proyecto
```
> Local
npm run dev

> Docker-Compose
docker-compose up -d --build

```

## Finalizar proceso docker compose

```
docker-compose down

```

## Logs-terminal

```
> Local: se ejecuta al correr la api.
> docker: docker-compose logs pikitmechapi

```
## Variables de entorno

- .env //ver en changelogs/envs
- local.env (para levantarlo sin docker)
- docker.env (para levantarlo con docker)
- reemplazr en .env de la raiz del proyecto


## PENDIENTE: Iniciado pero incompleto

> Proceso de autenticacion.

> Se crearon 2 tablas para Manager y Credentials que manejaran un proceso de login sencillo

> Luego se implementaran los middlewares correspondientes

