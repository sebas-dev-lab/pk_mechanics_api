# pk_mechanics_api
API with Typescript - Express - MySQL

## Requerimientos

- Instalar Node.js
- Instalar Docker & Docker Compose

-  **Si se trabaja sin docker entonces:**
    - Instalar MySQL
    - Modificar .env con credenciales correspondientes 

## Descripcion

- El proyecto se puede levantar localmente ya sea con/sin docker-compose, en el primer caso no es necesario instalar MySQL ya que se creara un contenedor con MySQL y otro dond se alojara la api.
- Proyecto testeado en Kali Linux y Windows 10.
- 

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
## Logs-terminal

```
> Local: se ejecuta al correr la api.
> docker: docker-compose logs pikitmechapi

```
## Variables de entorno

- .env


