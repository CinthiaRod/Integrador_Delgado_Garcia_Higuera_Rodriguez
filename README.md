## Gestión de Biblioteca

El objetivo de este proyecto es desarrollar una API para la gestión de una biblioteca mediante un servidor TCP implementado en Node.js.

Este sistema sigue el patrón de diseño MVC (Modelo-Vista-Controlador) para organizar y estructurar el código de manera modular y escalable. Los datos de la biblioteca se almacenan en bases de datos locales, representadas como archivos JSON, permitiendo su fácil manipulación y persistencia

### Estructura del proyecto

El proyecto sigue la estructura del patrón MVC:

📂 proyecto-libros  
├── 📂 controllers      # Controladores para manejar la lógica del programa 
├── 📂 models           # Modelos para la gestión de datos
├── 📂 views            # Vistas para mostrar datos  
├── 📂 data             # Archivos JSON para la persistencia de datos  
├── server.js          # Implementación del servidor TCP  
├── client.js          # Implementación del cliente TCP  
├── package.json       # Dependencias del proyecto  
├── README.md          # Documentación del proyecto

### Manejo de datos

* controllers/: Contiene los controladores que gestionan las acciones del cliente (autores, libros, editoriales).

* models/: Contiene la lógica para gestionar los datos de autores, libros y editoriales.

* views/: La parte visual de la aplicación (en este caso, el formato de respuesta).

* data/, se encuentran los archivos:
books.json: Contiene información sobre los libros.
authors.json: Contiene información sobre los autores.
publishers.json: Contiene información sobre las editoriales.

### Intrucciones para ejecutar el proyecto

1. Instalación de dependencias: Ejecutar npm install
2. Ejecutar el servidor:  node server.js
3. Ejecutar el cliente: client.js

### Uso del servidor TCP (server.js)

El servidor está implementado usando el módulo net de Node.js y escucha en el puerto 8080. El servidor maneja las conexiones de múltiples clientes, recibe comandos y responde con los resultados de las acciones solicitadas, como mostrar, agregar, eliminar o buscar libros, autores y editoriales

### Uso del cliente

El cliente está diseñado para interactuar con el servidor a través de comandos enviados en formato JSON. 

Al ejecutar el cliente, aparecerá el siguiente menú principal:

--- Menu principal ---
1. Autores
2. Libros
3. Editoriales
4. Salir

Cada opción te llevará a un menú interactivo que te permitirá:

#### Menú de Autores
1. Mostrar autores: Muestra todos los autores.
2. Agregar autor: Permite agregar un nuevo autor.
3. Buscar autor: Permite buscar autores por nombre.
4. Eliminar autor: Permite eliminar un autor por ID.
5. Volver al menú principal.

#### Menú de Libros
1. Mostrar libros: Muestra todos los libros.
2. Agregar libro: Permite agregar un nuevo libro.
3. Buscar libro: Permite buscar libros por título.
4. Eliminar libro: Permite eliminar un libro por ID.
5. Volver al menú principal.

#### Menú de Editoriales
1. Mostrar Editoriales: Muestra todas las editoriales.
2. Agregar Editorial: Permite agregar una nueva editorial.
3. Buscar Editorial: Permite buscar editoriales.
4. Eliminar Editorial: Permite eliminar una editorial por ID.
5. Volver al menú principal.

#### Cerrar el Cliente
Si se desea cerrar la conexión, se deberá elegir la opción "4. Salir" en el menú principal.

#### Manejo de Errores
Tanto el servidor como el cliente implementan manejo de errores. Si el cliente intenta enviar un comando no válido, se mostrará un mensaje de error. Si hay un error de conexión, el cliente también manejará este caso adecuadamente.
