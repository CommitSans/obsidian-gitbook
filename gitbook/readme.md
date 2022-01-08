# Recursos de diseño en Español
Recursos de diseño en español, gratis y abiertos


## TL;DR:

El proyecto está hecho con [Obsidian](https://obsidian.md). El Vault está en la carpete `obisidian`. Eso lo puedes modificar.

Un :robot: Robot Mágico que vive entre `src` y `.github` mueve el proyeto de Obsidian a la carpeta `gitbook` para tenerlo publicado. No toques nada en la carpeta `gitbook` o el robot lo borrará.


## Cómo está organizado este repositorio

Tenemos cuatro carpetas principales:

### obsidian
Es el proyecto principal de este repositorio. Todos los contenidos que se publican están aquí. Para hacer ésto, usamos [Obsidian](https://obsidian.md), un proyecto bastante molón de organización del conocimiento. 

Esta es la interfaz de edición (bueno, y de consumo, si quieres) de nuestros recursos. Porque es muy molón. 

### gitbook
Este proyecto de Obsidian lo publicamos en [GitBook](https://www.gitbook.com) cada vez que se actualiza algo. Esta carpeta es para el proyecto de GitBook. No tienes que tocar nada de ésta carpeta. 

De hecho, no debes tocar nada. La gestiona nuestro :robot: Robot Mágico, que ignora todo lo que un humano haga en sus dominios, y si hace falta lo destruye.

Si quieres cambiar algo de cómo se ve el GitBook, dinos algo por Discord o Trello, y ponemos a nuestro ejército de monos altamente especializados a cambiar el código del robot para que lo haga.

### src
Este es el código que convierte de Obsidian a lo que toque. En este caso, a GitBook (y próximamente a MarkDown plano). 

Si tienes conocimientos de desarrollo, querrás oir que está hecho en JavaScript, ejecutado con NodeJS, y que el código todavía tiene que mejorar mucho.
Si no los tienes, olvida la frase anterior. Es increíble, no tiene bugs y a veces felicita los cumpleaños. 

Si encuentras algo inesperado en el proyecto, y crees que es causa del código del robot (no nos engañemos, podría pasar...), [pon un issue](https://github.com/recursosdisenoes/recursos-diseno-es/issues/new) aquí, una tarjeta en el Trello, o di algo en Discord, y lo revisamos.

### .github
En esta carpeta tenemos los workflows de [GitHub Actions](https://github.com/features/actions). Es nuestro 🤖 Robot Mágico que hace tareas difíciles. Su trabajo principal es convertir el proyecto de Obsidian a un formato que podamos publicar de manera Open Source.

### book.json
Configuración del libro de GitBook. Sin más.

### LICENSE.md
La licencia por la que se rige éste proyecto. Si tienes dudas de si puedes o no hacer algo con el contenido de aquí (seguramente si puedas) [mira ahí](LICENSE.md) y lo que ponga, es ley.

### README.md
Este archivo que estás leyendo. 


## Preguntas Frecuentes
**¿Dónde está el Vault de Obsidian?**
En la carpeta `obsidian`. Eso es lo único que tendrías que modificar. Es nuestra única fuente de verdad.

**¿Por qué todo está en carpetas, y no tenemos el Vault en la raiz?**
Por flexibilidad y organización. 
Me explico. Ahora mismo estamos usando GitBook como frontend para publicar el proyecto.
 
Si mañana cierran, o nos dicen que hay que pagar mil millones de euros (o encontramos otro front mejor para publicar el proyecto), simplemente creamos una carpeta nueva para ese proyecto, y listo.

Si tenemos todo en la raiz, va a ser un lío tener en Obidian mil carpetas con cosas que no deberían estar.  

**¿Qué pasa si modifico algo en la carpeta `gitbook`?**
No lo hagas. 
_Ya, pero..._
No.
_Pero... ¿qué pasa?_
Que cuando mandes el push, el robot mágico que tenemos funcionando, pisará tus cambios. Esa carpeta se crea automáticamente y no hace caso a los cambios manuales. Por eso tenemos un script que hace magia.
_Ok, no lo toco._

**¿Y si tengo que modificar algo del GitBook?**
Pues creas una tarjetita en Trello, o lo dices en Discord, y modificamos el código para que esto pase automáticamente cada vez que alguien mande un cambio.

**Hay un commit que pone ":robot: Build for GitBook" y que pone que he hecho yo, pero yo no he sido**
Tranqui. Todo bajo control.
Nuestro robot mágico hace esto por tí. Cada vez que mandas un cambio en Obsidian, lo construye, y lo manda por tí. 

Así no tienes tu que andar ejecutando código, ni haciendo trabajo de robots. Que tu eres un ser humano, no un robot. Bueno, eso espero.

Todos los commits que haga por ti van firmados con un emoji :robot: al principio, porque es un Robot muy flipado. Y por si la lía...


## Quiero contribuir
Tenemos un canal de Discord, y un Trello donde comentamos todo lo que queremos añadir, o las cosas que quedan pendientes. Ahora mismo, las invitaciones las gestiona [@ivoriginal](https://twitter.com/ivoriginal).

También puedes mandarnos Pull Requests a este proyecto (los revisaremos con mucho cariño, I promise). 

Una Pull Request (PR) una forma organizada de mandar cambios a este repositorio. Hay mil tutoriales que explican cómo hacer esto. 

Si te suena a chino, [este tutorial explica todo muy bien](https://www.freecodecamp.org/espanol/news/como-hacer-tu-primer-pull-request-en-github/). La parte de consola la puedes hacer con el [cliente de GitHub para Escritorio](), que va muy bien. No tengas miedo

### Cuéntaselo a tus colegas
Difundir es una de las formas más fáicles de colaborar con el proyecto.

Esto es un proyecto entre todos, para todos. Si sabes de alguien a quien le puede ser útil, o que puede echar un cable, ¡cuéntaselo!
