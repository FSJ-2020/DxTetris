# DxTetris

Este juego es intenta ser una version tributo al mitico Tetris.

Tiene tantas versiones que solo intentare replicar la que recuerdo, de 8 bits.
Que jugaba en los años 80 en una consola replica de la de nintendo.
Esto solo con fines educativos.

Pueden obtener más información de Juego y su autor Alekséi Pázhitnov en:

[Wikipedia](https://es.wikipedia.org/wiki/Tetris)

Este repositorio se construye en base a varias iteraciones sobre el mismo código
probablemente algunas versiones no funionen tan bien ni tengan todo lo necesario
intentan deflejar cada version los pasos y el avance del desarrollo.

Las versiones corresponderan a una rama, con el nombre v1, v2, etc.
Y en master se encuentra la version actual en desarrollo.

El objetivo es completar la funcionalidades básicas que son:

- [x] Desplegar las figuras
- [x] Desplegar figuras dinamicamente
- [x] Hacer que las figuras deciendan
- [x] Limitar descenso hasta el fondo
- [x] Acomular las figuras en el fondo
- [ ] Mover las figuras lateralmente
- [x] Detectar colisiones entre las figuras que ya estaban en el fondo
- [ ] Detectar cuando se completan las lineas y limpiar las lineas.
- [ ] Agregar un area de puntaje e Incrementar el puntaje al detectar lineas completas
- [ ] Iniciar y pausar el juego
- [ ] Agregar musica al juego
- [ ] Agregar sonidos en algunas acciones

Probablemente en el transcurso del desarrollo se agreguen mas funcionalidades
Para cada iteración se mantendrá una rama con cada versión, así tambien un registro
de los cambios realizados por cada versión en este readme.

## v5

- Fix readme typos and layout
- se agrega contenido a readme
- Se detectan colisiones verticales
- Se detecta caso de fin de juego
- Se interrumpe el intervalo en caso de fin de juego

## v4

- Agrega movimiento a las figuras haciendo las descender
- Se limita descenso de la figura hasta el final de la matris tetris
- Cuando se alcanza el final se genera una nueva figura
- Para esto se agregó una función que es llamada cada cierto intervalo de tiempo

## v3

- Definir matriz tetris inicial
- Se mueve codigo de script a nuevo archivo game.js
- Definir elementos a poner en la matriz
- Despliega un solo elemento al principio de la matriz
  este elemento es seleccionado dinamicamente desde la lista de formas

## v2

- Se mueve el css a otro archivo
- Se agrega etiqueta script al final para escribir el html usando javascript
- Se crea matriz bi dimencional para representar elementos
- Se agrega vector mapColors para relacionar la posicion con la classe css que
  representa el color
- Nueva función displayTetris que recorre la matriz y crea los divs rows y los divs
  internos con los colores

## v1

- Se despliegan figuras y colores para diferentes figuras
- Se agrega css básico para entender la logica
