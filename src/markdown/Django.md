# Django

Django es un framework de desarrollo web de alto nivel y de código abierto, escrito en Python. Fue desarrollado con el objetivo de simplificar la creación de aplicaciones web complejas al proporcionar una estructura robusta y eficiente.

## Características principales

### Arquitectura MVC

Django sigue el patrón de arquitectura Modelo-Vista-Controlador (MVC), aunque con algunas variaciones. La arquitectura de Django se basa en el patrón Modelo-Vista-Template (MVT), donde:

- **Modelos**: Representan la estructura de datos de la aplicación. Los modelos definen la forma en que se almacenan y recuperan los datos en la base de datos.

- **Vistas**: Manejan la lógica de la aplicación y definen cómo se procesa la información. Las vistas se encargan de recuperar y manipular los datos del modelo, y pasan esos datos a las plantillas para su presentación.

- **Plantillas**: Definen la presentación visual de la aplicación web. Las plantillas están diseñadas en un lenguaje de marcado llamado **HTML** (HyperText Markup Language), y se pueden utilizar etiquetas de Django para agregar dinamismo y mostrar los datos proporcionados por las vistas.

### ORM (Object-Relational Mapping)

Django proporciona un **ORM** potente que permite interactuar con la base de datos utilizando objetos y consultas en Python. Esto significa que no es necesario escribir consultas SQL directamente, lo que simplifica el acceso a la base de datos y mejora la portabilidad de la aplicación. El ORM de Django maneja la generación de consultas SQL de manera eficiente y proporciona herramientas para realizar operaciones CRUD (crear, leer, actualizar, eliminar) de forma segura.

### Administrador de Django

Django incluye un **administrador de aplicaciones web** preconstruido que proporciona una interfaz de administración fácil de usar para gestionar los datos del sitio. Con el administrador de Django, los desarrolladores pueden crear interfaces de administración personalizadas sin tener que escribir código adicional. Esto facilita la gestión y manipulación de datos, lo que resulta especialmente útil en casos de desarrollo de aplicaciones con operaciones CRUD complejas.

### Enrutamiento de URL

Django cuenta con un sistema de enrutamiento de URL que mapea las URLs de la aplicación a las vistas correspondientes. Este enrutamiento se configura en el archivo `urls.py`, lo que permite definir rutas limpias y comprensibles para las diferentes funcionalidades de la aplicación. El enrutamiento de URL de Django es altamente configurable y compatible con patrones de URL complejos.

### Seguridad integrada

Django incluye numerosas medidas de seguridad para proteger las aplicaciones web de posibles vulnerabilidades. Estas medidas incluyen protección contra ataques de inyección de SQL, ataques de falsificación de solicitudes entre sitios (CSRF), ataques de script entre sitios (XSS) y más. Django también proporciona herramientas para autenticación de usuarios, control de acceso y cifrado de contraseñas.

## Ejemplo de código

A continuación, se muestra un ejemplo básico de cómo se puede definir una vista en Django:

```python
from django.http import HttpResponse

def hola_mundo(request):
    return HttpResponse("¡Hola, mundo!")