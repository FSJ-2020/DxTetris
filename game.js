// Matriz para representar el juego
var tetris;

// Define velocidad del juego
var speed = 350;

// Variable para asignar el intervalo
var loopInterval = 0;

// Matriz para relacionar colores con numeros de matriz tetris
// 0 = empty, 1 = yellow, etc...
var mapColors = ['empty', 'yellow', 'blue', 'red', 'green']

// Define los elementos nombre color y forma
var shapesList = [{
    name: "box",
    color: 1,
    shape: [
        [1, 1],
        [1, 1]
    ]
},
{
    name: "line",
    color: 3,
    shape: [
        [1],
        [1],
        [1],
        [1]
    ]
},
{
    name: "triangle",
    color: 2,
    shape: [
        [1, 1, 1],
        [0, 1, 0],
    ]
},
{
    name: "s",
    color: 4,
    shape: [
        [1, 1, 0],
        [0, 1, 1]
    ]
}
]

// Objeto con la forma para ir moviendo el elemento
var running;

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

    // Guarda la referencia al objeto que estamos agregando
    running = element;

    // Llama a colorise para agregar el color en la matriz de tetris
    colorise(element, element.color);
}

/**
 * Agrega el elemento y color de la forma en la matriz
 * @param {*} element  // Elemento con la forma
 * @param {*} color // Color a pintar
 */
function colorise(element, color) {
    // Agrega la forma del elemento a la matriz tetris
    for (var y = 0; y < element.shape.length; y++) {
        for (var x = 0; x < element.shape[0].length; x++) {
            if (element.shape[y][x] == 1) {
                tetris[y + element.y][x + element.x] = color;
            }
        }
    }
}
/**
 * Devuelve un numero random entre el min (incluido) y el max (excluido)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Inicaliza la matriz tetris
 */
function initTetris() {
    const largo = 20;
    const ancho = 10;
    const valorPorDefecto = 0;
    tetris = new Array(largo); // crea una matriz de longitud largo
    for (var i = 0; i < largo; i++) {
        // define cada elemento como una matriz de longitud ancho
        tetris[i] = new Array(ancho);
        for (var j = 0; j < ancho; j++) {
            // asigna a cada elemento de la matriz bidimensional el valor por defecto
            tetris[i][j] = valorPorDefecto;
        }
    }
}

/**
 * Despliega los elementos div en base a la matriz tetris
 */
function displayTetris() {
    var output = '';
    for (let i = 0; i < tetris.length; i++) {
        output += "<div class='row'>";
        for (let j = 0; j < tetris[i].length; j++) {
            output += "<div class='" + mapColors[tetris[i][j]] + "'></div>";
        }
        output += "</div>";
    }
    // Reemplaza el contenido
    document.getElementById("tetris").innerHTML = output;
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
                document.getElementById("status").innerHTML = "Game Over";

                clearInterval(loopInterval);
                loopInterval = 0;
                return;
            }
            selectRandomForm();
        } else { // La posicion aun es valida
            // Limpia el color en la posicion original
            colorise(element, 0);
            // Incrementa la posicion vertical
            element.y++;

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
 * Verifica si el elemento ha llegado al final o si 
 * colisiona verticalmente con otros objetos
 * @param {*} element elemento en movimiento 
 */
function canGoDown(element) {

    // Valida la posicion y + el largo de la forma versus el largo de la matriz tetris
    if (element.y + element.shape.length >= tetris.length) {
        return false;
    }
    // verifica la colision con otras figuras en el fondo del tetris
    for (var x = 0; x < element.shape[0].length; x++) {
        for (var y = element.shape.length - 1; y >= 0; y--) {
            if (element.shape[y][x] == 1) {
                if (tetris[y + element.y + 1][x + element.x] != 0) {
                    return false
                }
                break;
            }
        }
    }
    return true;
}

function canGoHorizontal(element) {
    if (element.x + element.movex < 0) {
        return false;
    }
    if (element.x + element.movex + element.shape[0].length > tetris[0].length) {
        return false;
    }
    return true;
}
/**
 * Funcion para ejecutar las instrucciones en un intervalo de tiempo
 */
function gameLoop() {
    moveShape();
    displayTetris();
}

// Inicializa la matriz
initTetris();

// Despliega el tetris
displayTetris();

function startPauseGame() {
    if (!loopInterval) {
        if (!running) {
            selectRandomForm();
            console.log("Starting");
            document.getElementById("status").innerHTML = "Start";
        } else {
            console.log("Continue");
            document.getElementById("status").innerHTML = "Continue";
        }
        // Configura intervalo de tiempo para ejecutar el loop principal
        loopInterval = setInterval(gameLoop, speed);
    } else {
        console.log("Pause");
        document.getElementById("status").innerHTML = "Pause";
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
    } else if (e.keyCode == 32) {
        // Espacio
    } else if (e.keyCode == 13) {
        // Enter 
        startPauseGame();
    }
}

