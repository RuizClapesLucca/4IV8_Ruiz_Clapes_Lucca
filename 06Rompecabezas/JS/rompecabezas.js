var instrucciones = [
    " Utiliza las piezas correctamente para completar la imagen !Diviertete jugando¡",
    "Para ordenar las piezas, haz clic en la pieza que deseas mover y luego haz clic en la dirección a la que deseas moverla (arriba, abajo, izquierda, derecha). Asegurate de que la pieza que deseas mover este adyecente a la pieza vacia este adyacente a la pieza que deseas mover para que el movimiento sea valido."

]
var movimientos = [];
var rompe =[
    [1,2,3]
    [4,5,6]
    [7,8,9]
]
var rompeCorrecta =[
    [1,2,3]
    [4,5,6]
    [7,8,9]
]

//Necesito conocer la poscicion de la pieza vacias
var filavacia = 2;
var columnavacia=2;

//Necesito una funcion que se encarge de mostrar las instrucciones
function mostrarInstrucciones(){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i],"lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}
