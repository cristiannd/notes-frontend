# Aplicación de notas (frontend)
Este es el repositorio encargado de la parte del __frontend__ de la aplicación de notas. Esta aplicación permite iniciar sesión con un usuario válido, y guardar notas que son procesadas por el backend y almacenadas en una base de datos.

## Estructura de carpetas
~~~
├── public 
│   └── index.html 
├── src 
│   ├── components 
│   │   └── ...
│   ├── services
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── index.css
└── cypress
    ├── e2e
    │   └── ...
    └── support
        └── ...
~~~

## Testing
Para realizar test unitarios y de integración se utilizan dos librerías: [JEST](https://jestjs.io/) y [Testing-library](https://testing-library.com/).Y para los test end to end se utiliza [Cypress](https://www.cypress.io/).
