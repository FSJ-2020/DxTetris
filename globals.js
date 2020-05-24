// Definicion de constantes
const largo = 20;
const ancho = 10;
const valorPorDefecto = 0;


// Matriz para representar el juego
var tetris;

// Define velocidad del juego
var speed = 350;
var quick = 100;

// Variable para asignar el intervalo
var loopInterval = 0;

// Variable para contar el puntaje
var score = 0;

// Matriz para relacionar colores con numeros de matriz tetris
// 0 = empty, 1 = yellow, etc...
var mapColors = [
    'empty',  // 0
    'red',    // 1
    'yellow', // 2
    'magenta',// 3
    'cyan',   // 4
    'blue',   // 5
    'green',  // 6
    'orange'  // 7
]

// Define los elementos nombre color y forma
var shapesList = [
    {
        name: "o",
        color: 5,
        shape: [
            [1, 1],
            [1, 1]
        ]
    },
    {
        name: "i",
        color: 1,
        shape: [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ]
    },
    {
        name: "t",
        color: 6,
        shape: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    {
        name: "s",
        color: 4,
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]

        ]
    },
    {
        name: "z",
        color: 7,
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: "j",
        color: 2,
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },
    {
        name: "l",
        color: 3,
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    }
]

// Objeto con la forma para ir moviendo el elemento
var running;
