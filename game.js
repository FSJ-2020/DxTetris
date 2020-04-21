// Matriz para representar el juego
var tetris;
// Matriz para relacionar colores con numeros de matriz tetris
// 0 = empty, 1 = yellow, etc...
var mapColors = ['empty', 'yellow', 'blue', 'red', 'green']

// Inicaliza la matriz tetris
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

// Despliega los elementos div en base a la matriz tetris
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

initTetris();
displayTetris();