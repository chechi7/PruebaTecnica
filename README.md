# Task Management API - Prueba Tecnica

Este proyecto es una API profesional para la gestion de tareas, construida con NestJS y siguiendo los principios de la Arquitectura Hexagonal.

## Tecnologias Utilizadas

* Framework: NestJS
* Lenguaje: TypeScript
* Base de Datos: PostgreSQL (mediante TypeORM)
* Contenedores: Docker y Docker Compose
* Documentacion: Swagger (OpenAPI 3.0)
* Validacion: Class-validator y Class-transformer

## Explicacion de Decisiones Tecnicas

Se ha implementado una Estructura Hexagonal para asegurar que la logica de negocio sea independiente de las herramientas externas:

* Domain: Contiene las entidades y reglas de negocio puras.
* Application: Implementa los casos de uso (Servicios). Aqui se gestiona la logica que autogenera la fecha (dueDate) y el estado (status) si no son proporcionados por el usuario.
* Infrastructure: Adaptadores de entrada (Controladores REST con Swagger) y salida (Repositorios TypeORM).

## Funcionalidades Destacadas

### 1. Gestion Inteligente de Tareas
La API incluye logica en la capa de aplicacion para autogenerar valores por defecto:
* Automatizacion: Si se omiten los campos status o dueDate (o se envian vacios ""), el sistema asigna automaticamente "PENDING" y la fecha/hora actual respectivamente.

### 2. Soft Delete (Borrado Logico)
Las tareas no se eliminan fisicamente de la base de datos. Se utiliza una columna deletedAt para permitir la recuperacion de datos y auditoria profesional.
* Endpoint de Auditoria: Se dispone de una ruta especifica para consultar las tareas que han sido marcadas como eliminadas.

## Endpoints y Descripcion

| Metodo | Endpoint | Descripcion |
| :--- | :--- | :--- |
| POST | /tasks | Crea una tarea vinculada a un usuario. Genera fecha y estado automaticamente si se envian vacios. |
| GET | /tasks/user/{id} | Obtiene todas las tareas activas asociadas a un ID de usuario especifico. |
| GET | /tasks/user/{id}/deleted | Endpoint de auditoria que lista las tareas eliminadas (soft delete) de un usuario. |
| PATCH | /tasks/{id}/status | Actualiza el estado de una tarea (PENDING, IN_PROGRESS, DONE). |
| DELETE | /tasks/{id} | Realiza un borrado logico de la tarea, permitiendo su persistencia en el historial de auditoria. |

## Ejemplos de Request y Response

### Crear Tarea (POST /tasks)
**Request Body:**
```json
{
  "title": "Finalizar Proyecto",
  "description": "Revision final de la documentacion",
  "userId": "2de90416-dc07-480b-aaec-60b9ac67fd17",
  "dueDate": "",
  "status": ""
}