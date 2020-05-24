/**
 * Inicaliza la matriz tetris
 */
function initTetris() {

    tetris = new Array(largo); // crea una matriz de longitud largo
    for (var i = 0; i < largo; i++) {
        // define cada elemento como una matriz de longitud ancho
        tetris[i] = new Array(ancho);
        for (var j = 0; j < ancho; j++) {
            // asigna a cada elemento de la matriz bidimensional el valor por defecto
            tetris[i][j] = valorPorDefecto;
        }
    }
    // Reinicia el puntaje
    score = 0;
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
 * Muestra el puntaje en la pagina desde la variable global
 */
function displayScore() {
    document.getElementById("points").innerHTML = score;
}

/**
 * Devuelve un numero random entre el min (incluido) y el max (excluido)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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

/**
 * Verifica si el movimiento horizontal puede realizarce
 * @param {*} element 
 * @param {*} direction puede ser:
 *  -1 -> izquierda 
 *   1 -> derecha
 */
function canGoHorizontal(element) {
    for (var y = element.shape.length - 1; y >= 0; y--) {
        // verifica izquierda
        if (element.movex < 0) {
            for (var x = 0; x < element.shape[0].length; x++) {
                if (element.shape[y][x] == 1) {
                    // Verifica posicion minima
                    if (x + element.x - 1 < 0) {
                        return false;
                    }
                    // verifica colision izquierda
                    if (tetris[y + element.y][x + element.x - 1] != 0) {
                        return false;
                    }
                    break;
                }
            }
        } else {
            // verifica derecha 
            for (var x = element.shape[0].length; x >= 0; x--) {
                if (element.shape[y][x] == 1) {
                    // verifica posicion maxima
                    if (x + element.x + 1 > tetris[0].length) {
                        return false;
                    }

                    // verifica colision derecha
                    if (tetris[y + element.y][x + element.x + 1] != 0) {
                        return false;
                    }
                    break;
                }
            }
        }
    }

    return true;
}