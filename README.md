# TaskTracker

## Descripción
Este proyecto es una aplicación para gestionar tareas, donde puedes crear listas de tareas y controlar el progreso de cada una.
Fue desarrollado como una introducción práctica a Spring Boot, enfocándome en la creación de APIs REST y la gestión de datos.
El proyecto esta en desarrollo y se le agregaran nuevas funcionalidades

## Tecnologías Utilizadas
- Lenguaje: Java 21
- Framework: Spring Boot 3.5.0
- Base de Datos: PostgreSQL

## Implementación

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/javierjaure95/TaskTracker.git
   ```
2. Una vez dentro de la carpeta:
   ```bash
   cd tasktracker
   ```
3. Crear y levantar los contenedores Docker
   ```bash
   docker-compose up -d
   ```

Esto iniciará la API RESTful en el puerto 8080 y la base de datos PostgreSQL en el puerto 5432.

## Test

### Postman
Para probar la API, importa el archivo `TaskTracker.postman_collection.json` en Postman.
Desde allí podrás ejecutar las distintas solicitudes para verificar el funcionamiento de los endpoints.

### Frontend

También se creó un Frontend para probar las funcionalidad, el Frontend fue desarrollado en Angular 17 
y Boostrap 5. 

#### Implementación

Para iniciar el frontend:

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/javierjaure95/TaskTracker.git
   ```
2. Una vez dentro de la carpeta:
   ```bash
   cd Frontend
   ```
3. Levantar el frontend
   ```bash
   npm start
   ```
Esto iniciará el frontend en el puerto 4200.
