// Expresión regular para validar números positivos
var regexNumero = /^[0-9]+(\.[0-9]{1,2})?$/;

function calcular(formulario){
    var totalCompra = formulario.totalCompra.value;
    
    if(totalCompra == ""){
        alert("Por favor ingresa el total de compra");
        formulario.totalCompra.focus();
        return false;
    }
    
    if(!regexNumero.test(totalCompra)){
        alert("El total debe ser un número positivo");
        formulario.totalCompra.focus();
        return false;
    }
    
    if(parseFloat(totalCompra) <= 0){
        alert("El total debe ser mayor a 0");
        formulario.totalCompra.focus();
        return false;
    }
    
    var subtotal = parseFloat(totalCompra);
    var descuento = subtotal * 0.15;
    var totalFinal = subtotal - descuento;
    
    document.getElementById("subtotalMostrado").innerHTML = "$" + subtotal.toFixed(2);
    document.getElementById("descuentoMostrado").innerHTML = "$" + descuento.toFixed(2);
    document.getElementById("totalFinalMostrado").innerHTML = "$" + totalFinal.toFixed(2);
}

function limpiar(formulario){
    formulario.totalCompra.value = "";
    document.getElementById("subtotalMostrado").innerHTML = "$0.00";
    document.getElementById("descuentoMostrado").innerHTML = "$0.00";
    document.getElementById("totalFinalMostrado").innerHTML = "$0.00";
}
