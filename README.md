# Keola App

Bienvenido a Keola App.

## Requerimientos

- Angular: 18.0.3 o superior.
- Ejecutar `npm install`, a fin de instalar las dependencias del proyecto.

## Lanzar la aplicación

- Para lanzar la aplicación, ejecuta `ng s -o`, esto abrirá en el navegador la versión de desarrollo.
- Entrar a https://keola-app.netlify.app, para ver una vesión desplegada en netflify. Esto no requiere instalar nada.

## Descripción del proyecto

El proyecto consta de 3 pantallas:

### Login

![Login page](/public/images/login.png)

- Brinda una interfaz para que el usuario ingrese con sus credenciales.
- Los datos de acceso son los mismo que en el ejemplo:

{
"username": "master",
"password": "Inclub1245#"
}

### Memberships

![Memberships page](/public/images/memberships.png)

- Lista las membresías del usuario con ID 12853.
- Es una tabla que permite visualizar distintos datos de las suscripciones del usuario.
- Cuenta con un botón para ver los cronogramas de pago de cada suscripción.

### Schedules

![Schedules page](/public/images/schedule.png)

- Lista los pagos realizados para una determinada suscripción.
- Cuenta con un indicador para ver si el pago ha sido validado, está inactivo o requiere validación.
- \*En el caso de los datos que brinda el API, al hacer pruebas aprobé los pagos pendientes de validación, por lo que ya no tengo pagos pendientes de validación.
