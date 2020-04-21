// Matriz para representar el juego
var tetris;
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

    // Guarda la referencia al objeto que estamos agregando
    running = element;

    // Agrega la forma del elemento a la matriz tetris
    for (var y = 0; y < element.shape.length; y++) {
        for (var x = 0; x < element.shape[0].length; x++) {
            if (element.shape[y][x] == 1) {
                tetris[y + element.y][x + element.x] = element.color;
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

// Inicializa la matriz
initTetris();
// Agrega un elemento
selectRandomForm();
// Despliega el tetris
displayTetris();