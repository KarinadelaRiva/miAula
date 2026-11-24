# miAula

Sistema web para administrar aulas, recursos educativos, eventos, carreras, comisiones, materias y reservas institucionales.

El proyecto está dividido en dos aplicaciones:

- **Frontend:** Angular 20
- **Backend:** Spring Boot 4.1.1 y Java 21
- **Base de datos:** MySQL
- **Autenticación:** Spring Security con JWT
- **Documentación de API:** SpringDoc OpenAPI / Swagger

## Funcionalidades

### Administrador

- Gestión de usuarios y asignación de roles.
- Alta, modificación y desactivación de carreras.
- Gestión de materias y comisiones.
- Gestión de espacios físicos y recursos.
- Administración de eventos y reservas.
- Consulta del calendario y de solicitudes pendientes.
- Aprobación o rechazo de solicitudes de reserva.

### Profesor

- Consulta del calendario de reservas y eventos.
- Solicitud de nuevas reservas.
- Consulta y cancelación de solicitudes propias.
- Consulta de reservas activas y terminadas.
- Solicitud de modificación de reservas vigentes.
- Administración de su perfil y contraseña.

### Usuarios registrados

- Inicio de sesión mediante JWT.
- Consulta de disponibilidad de aulas y recursos.
- Gestión de solicitudes según los permisos asignados.

## Tecnologías

### Frontend

- Angular 20
- TypeScript 5.9
- RxJS 7.8
- Angular Router
- Angular HTTP Interceptor
- Karma y Jasmine

### Backend

- Spring Boot 4.1.1
- Spring Web
- Spring Data JPA / Hibernate
- Spring Security
- JWT con JJWT 0.13
- Bean Validation
- Lombok
- SpringDoc OpenAPI
- Maven
- MySQL Connector/J

## Estructura del proyecto

```text
miAula/
├── front-mi-aula/       # Aplicación Angular
│   ├── public/          # Imágenes y recursos públicos
│   └── src/app/
│       ├── auth/        # Modelos y servicio de autenticación
│       ├── guards/      # Protección de rutas
│       ├── interceptor/ # Inyección del token JWT
│       ├── models/      # Modelos compartidos
│       ├── pages/       # Pantallas de la aplicación
│       └── services/    # Comunicación con la API
└── miAulaAPI/           # API REST con Spring Boot
    └── src/main/java/com/miAula/miAula/
        ├── config/
        ├── controller/
        ├── dtos/
        ├── entities/
        ├── exceptions/
        ├── repository/
        ├── security/
        ├── service/
        └── util/
```

## Requisitos previos

Instalar:

- Java 21
- Maven 3.9 o superior
- Node.js compatible con Angular 20
- npm
- MySQL 8 o compatible

Opcional:

- Angular CLI: `npm install -g @angular/cli`

## Configuración inicial

### 1. Crear la base de datos

Desde MySQL ejecutá:

```sql
CREATE DATABASE mi_aula CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configurar el backend

La configuración principal se encuentra en:

```text
miAulaAPI/src/main/resources/application.properties
```

Por defecto utiliza:

```properties
spring.application.name=miAula

spring.datasource.url=jdbc:mysql://localhost:3306/mi_aula
spring.datasource.username=${MIAULA_DB_USERNAME:tu_usuario}
spring.datasource.password=${MIAULA_DB_PASSWORD:tu_contraseña}

spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=${MIAULA_JWT_SECRET}
```

En PowerShell podés definir las credenciales de MySQL y la clave JWT antes de iniciar el backend:

```powershell
$env:MIAULA_DB_USERNAME="tu_usuario"
$env:MIAULA_DB_PASSWORD="tu_contraseña"
$env:MIAULA_JWT_SECRET="una_clave_JWT_segura"
```

Hibernate está configurado con `spring.jpa.hibernate.ddl-auto=update`, por lo que puede crear o actualizar las tablas a partir de las entidades al iniciar la aplicación.

Al iniciar por primera vez, `StartupSeeder` crea los roles predeterminados administrador y profesor. También crea el usuario administrador si todavía no existe:

- **Email:** `admin@gmail.com`
- **Contraseña:** `admin`

> Cambiar estas credenciales antes de utilizar el sistema en producción.

### 3. Instalar las dependencias del frontend

Desde la raíz del repositorio:

```powershell
cd front-mi-aula
npm install
```

## Ejecutar el proyecto

### Iniciar el backend

Desde la raíz del repositorio:

```powershell
cd miAulaAPI
.\mvnw.cmd spring-boot:run
```

La API quedará disponible en:

```text
http://localhost:8080
```

### Iniciar el frontend

En otra terminal, desde la raíz del repositorio:

```powershell
cd front-mi-aula
npm start
```

La interfaz estará disponible en:

```text
http://localhost:4200
```

El frontend utiliza `http://localhost:8080` como URL base de la API y admite solicitudes desde `http://localhost:4200`.

## Autenticación

El login inicial se realiza mediante:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

La respuesta contiene un token JWT. Las solicitudes autenticadas deben enviarlo en el encabezado:

```http
Authorization: Bearer <token>
```

El interceptor del frontend agrega automáticamente el token a las solicitudes después del inicio de sesión.

## Recursos principales de la API

| Recurso | Ruta base |
| --- | --- |
| Autenticación | `/auth` |
| Usuarios | `/usuarios` |
| Carreras | `/carreras` |
| Materias | `/materias` |
| Comisiones | `/comisiones` |
| Espacios | `/espacios` |
| Recursos | `/recursos` |
| Reservas | `/reservas` |
| Solicitudes | `/solicitudes` |
| Eventos | `/eventos` |

## Pruebas

### Backend

```powershell
cd miAulaAPI
.\mvnw.cmd test
```

### Frontend

```powershell
cd front-mi-aula
npm test
```

### Build de producción del frontend

```powershell
cd front-mi-aula
npm run build
```

Los archivos compilados se generan en `front-mi-aula/dist/front-mi-aula/browser/`.

## Seguridad

Antes de desplegar el proyecto:

- Definir el usuario y la contraseña de MySQL mediante variables de entorno, sin escribirlos directamente en el código.
- Configurar una clave JWT propia y segura. Puede utilizarse la variable `MIAULA_JWT_SECRET` o reemplazar directamente el valor de `jwt.secret`.
- Cambiar las credenciales predeterminadas del administrador.
- Restringir los orígenes CORS a los dominios reales del frontend.
- Configurar HTTPS y un entorno de MySQL seguro.

## Licencia

Este proyecto se distribuye bajo la licencia Apache 2.0. Consultá el archivo [LICENSE](LICENSE) para conocer los términos completos.
