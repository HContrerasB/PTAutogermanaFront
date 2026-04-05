# ZombieDefenseFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 🧟 Zombie Defense System

Sistema fullstack para la gestión, simulación y análisis estratégico de defensa contra hordas de zombies.

Desarrollado como **prueba técnica Fullstack**, implementando buenas prácticas de arquitectura, separación por capas y una interfaz moderna enfocada en experiencia de usuario.

---

## 🚀 Demo en Vivo

### 🌐 Frontend
https://zombie-defense-front.web.app

### ⚙️ Backend API
https://zombie-defense-api.onrender.com/swagger

---

## 🏗️ Arquitectura

El backend fue desarrollado siguiendo principios de:

- **Clean Architecture**
- **CQRS**
- **MediatR**
- **Repository Pattern**
- **Dependency Injection**
- **Entity Framework Core**
- **Middleware para API Key**
- **Swagger con documentación**

### 📂 Estructura backend
```text
ZombieDefenseSystem
│
├── ZombieDefenseSystem.Api
├── ZombieDefenseSystem.Application
├── ZombieDefenseSystem.Domain
└── ZombieDefenseSystem.Infrastructure
src/app
│
├── core
│   ├── models
│   └── services
│
├── layout
│   ├── header
│   ├── sidebar
│   └── dashboard-layout
│
└── pages
    ├── zombies
    ├── simulacion
    ├── ranking
    └── estadisticas
    🛠️ Stack Tecnológico
Backend
.NET 8
ASP.NET Core Web API
Entity Framework Core
SQL Server
MediatR
Swagger / OpenAPI
Frontend
Angular
TypeScript
SCSS
RxJS
Angular Router
Firebase Hosting
Deploy
Frontend: Firebase Hosting
Backend: Render
Base de datos: SQL Server
🎯 Funcionalidades
🧟 Gestión de Zombies
Crear zombies
Editar zombies
Activar / desactivar
Listado completo
Tipos de amenaza
Balance de atributos:
tiempo de disparo
balas necesarias
puntaje
amenaza
🎮 Simulación
Simulación de defensa por:
tiempo disponible
munición
cálculo de:
zombies eliminados
puntaje final
estrategia óptima
animación visual con GIF de impacto
🏆 Ranking
Ranking por puntajes
historial de simulaciones
mejores resultados
📊 Estadísticas
métricas generales
promedio de eliminaciones
score acumulado
desempeño por simulación
