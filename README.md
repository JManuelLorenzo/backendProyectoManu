# Base de datos implementando NodeJs, Express, Nodemon, Sqlite3, Swagger y Prisma.
El proyecto se basa en una API REST  de peliculas donde se utiliza un ORM y se establecen
las operaciones CRUD. Se implementa utilizando el framework Express.
Se utiliza Nodemon para facilitar el testeo de forma local aunque este podria ser desechado, 
Swagger se utiliza para realizar la documentacion de la API mientras que Prisma se usa para el ORM.
No implemente la operacion de Login, debido a que no le encontraba sentido en mi base de datos.
Utiliza soft delete para el delete y el update permite cambiar unicamente el quote, lo que es una correcta implementacion.
Mis peliculas se componen de ID,TITULO,QUOTE,CHARACTER y DELETED(si esta eliminado o no, boolean).
Mi proyecto esa formado basandose en la estructura clasica de rutas, controladores y servicios.
## NodeJS: 
Permite realizar todo el proceso del backend en JavaScript. 
## Express:
Permite configurar y realizar rapidamente el servidor, es un modulo de NodeJS
## Nodemon:
Permite que el servidor se reinicie despues de cualquier cambio en el localHost. Es un modulo de NodeJS
## Sqlite3:
Sistema para gestionar bases de datos de tamaño pequeño.
## Swagger:
Permite la documentacion del Api, herramienta que se utilizo para testear ENDPOINTS.
## Prisma:
Permite simplificar el proyecto, ya que en vez de utilizar secuencias de texto SQL se pueden implementar 
con metodos de prisma. Haciendo más compacto y uniforme el código a través de objetos.
## Instalacion:
Se requiere tener NodeJS y realizar npm install. Luego de eso deberian actualizarse los modulos de NodeJS.
Posteriormente con realizar npm start en la consola y ya se deberia poner  marcha el server.
Luego accediendo a http://localhost:3000/api-docs ya se puede checkear el proyecto.
