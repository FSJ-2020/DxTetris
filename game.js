/**
 * Selecciona una del las formas y la agrega a la matriz
 */
function selectRandomForm() {
    // Obtiene un nro random dentro del largo de la matriz
    let position = getRandomArbitrary(0, shapesList.length);
    // Obtiene la forma desde shapeList en la posicion
    let shape = shapesList[position];
    // Crea una copia ya que el objeto shape es una referencia
    // al elemento en la lista shapesList
    let element = JSON.parse(JSON.stringify(shape));

    // Define la maxima posicion posible dentro de la matriz
    // considerando el ancho de la forma del elemento seleccionado
    const maxPosX = tetris[0].length - element.shape[0].length + 1;
    // Define una posición random en la matriz en el rango
    let xpos = getRandomArbitrary(0, maxPosX);
    // Crea los parametros x e y donde comienzan los objetos
    // y que luego podremos cambiar
    element.x = xpos;
    element.y = 0; // Partimos arriba
    // Definimos parametro para saber si esta en movimiento
    element.isMoving = false;
    // Definimos el parametro movex para indicar la intencion
    // de mover la figura horizontalmente 
    // cuando sea -1 es izq y 1 derecha, 0 no hay movimiento
    element.movex = 0;
    // Definimos parametro rotate para indicar la intencion
    // de rotar la figura, valores posibles 0 y 1
    element.rotate = 0;

    // Guarda la referencia al objeto que estamos agregando
    running = element;
}




/**
 * Transpone la matriz shape
 * @param {*} element
 */
function rotateShape(element) {
    var matrix = element.shape;
    var largo = matrix.length;
    var nuevaMatrix = creaMatriz(largo, largo);

    for (var i = 0, j = largo - 1; i < largo && j >= 0; i++, j--) {
        for (var k = 0; k < largo; k++) {
            nuevaMatrix[k][j] = matrix[i][k];
        }
    }
    element.shape = nuevaMatrix;
}

/**
 * Mueve la forma running hacia abajo
 * En caso de que este al inicio solo la agrega utilizando la funcion colorise
 * En caso que este al final no invoca a selectRandomForm para crear una figura
 * nueva al comienzo de la matriz.
 * En el caso que no este al comienzo ni al final realiza limpieza de la figura
 * en la posicion actual, luego incremente la posicion y
 * finalmente agrega la figura en la nueva posicion.
 */
function moveShape() {
    // Copy reference from running object
    let element = running;

    if (element.y == 0 && !element.isMoving) {
        colorise(element, element.color);
        element.isMoving = true;
    } else {
        // verifica que si se ha salido de la matriz tetris o si colisiona verticalmente
        if (!canGoDown(element)) {
            if (element.y == 0) {
                console.log("Fin del juego");
                changeStatus("Juego Terminado");
                clearInterval(loopInterval);
                loopInterval = 0;
                return;
            }
            checkFullLines();
            selectRandomForm();
            clearInterval(loopInterval);
            loopInterval = setInterval(gameLoop, speed);
        } else { // La posicion aun es valida
            // Limpia el color en la posicion original
            colorise(element, 0);
            // Incrementa la posicion vertical
            element.y++;

            if (element.rotate != 0) {
                rotateShape(element);
                element.rotate = 0;
            }

            // el usuario intenta mover a la izq o derecha
            if (element.movex != 0) {
                if (canGoHorizontal(element)) {
                    element.x += element.movex;
                }
                // restaura el parametro
                element.movex = 0;
            }
            // Agrega elemento en la nueva posición
            colorise(element, element.color);
        }
    }
}


/**
 * Revisa si se han completado lineas en el juego
 * Ademas modifca el puntaje
 */
function checkFullLines() {
    let completedLines = 0;
    for (let i = tetris.length - 1; i >= 0; i--) {
        let fullLine = true;
        for (let j = 0; j < tetris[i].length; j++) {
            if (tetris[i][j] == 0) {
                fullLine = false;
                break;
            }
        }
        if (fullLine) {
            for (let y = i; y > 0; y--) {
                for (let x = 0; x < tetris[0].length; x++) {
                    const value = tetris[y - 1][x];
                    tetris[y][x] = value;
                }

            }
            i++;
            completedLines++;
        }
    }
    console.log("Líneas completadas: " + completedLines);
    score += completedLines * completedLines * 10;
}

/**
 * Funcion para ejecutar las instrucciones en un intervalo de tiempo
 */
function gameLoop() {
    moveShape();
    displayTetris();
    displayScore();
}

// Inicializa la matriz
initTetris();

// Despliega el tetris
displayTetris();

/**
 * Cambia el mensaje de estado actual del juego
 * @param {String} text 
 */
function changeStatus(text) {
    document.getElementById("status").innerHTML = text;
}

function startPauseGame() {
    if (!loopInterval) {
        if (!running) {
            selectRandomForm();
        }
        changeStatus("Corriendo")
        // Configura intervalo de tiempo para ejecutar el loop principal
        loopInterval = setInterval(gameLoop, speed);
    } else {
        changeStatus("Detenido");
        clearInterval(loopInterval);
        loopInterval = 0;
    }
}

// Agrega funcion para detectar teclas
document.onkeydown = function (e) {
    console.log("KeyCode:" + e.keyCode);
    if (e.keyCode == 37) {
        // Izquierda
        running.movex--;
    } else if (e.keyCode == 39) {
        // Derecha
        running.movex++;
    } else if (e.keyCode == 38) {
        // Arriba
    } else if (e.keyCode == 40) {
        // Abajo
        clearInterval(loopInterval);
        loopInterval = setInterval(gameLoop, quick);
    } else if (e.keyCode == 32) {
        // Espacio
        running.rotate = 1;
    } else if (e.keyCode == 13) {
        // Enter 
        startPauseGame();
    }
}

