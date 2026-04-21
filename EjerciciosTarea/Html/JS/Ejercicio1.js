// expresión regular para validar números
var regexNumero = /^[0-9]+(\.[0-9]{1,2})?$/;

// función para calcular la ganancia
function calcular(formulario){
    var capital = formulario.capitalInicial.value;
    
    // verificar que no esté vacío
    if(capital == ""){
        alert("Por favor ingresa un capital inicial");
        formulario.capitalInicial.focus();
        return false;
    }
    
    // verificar que sea un número válido con la expresión regular
    if(!regexNumero.test(capital)){
        alert("El capital debe ser un número positivo");
        formulario.capitalInicial.focus();
        return false;
    }
    
    // verificar que sea mayor a 0
    if(parseFloat(capital) <= 0){
        alert("El capital debe ser mayor a 0");
        formulario.capitalInicial.focus();
        return false;
    }
    
    // calcular ganancia del 2%
    var ganancia = parseFloat(capital) * 0.02;
    var totalFinal = parseFloat(capital) + ganancia;
    
    // mostrar los resultados en pantalla
    document.getElementById("capitalMostrado").innerHTML = "$" + parseFloat(capital).toFixed(2);
    document.getElementById("gananciaMostrada").innerHTML = "$" + ganancia.toFixed(2);
    document.getElementById("totalMostrado").innerHTML = "$" + totalFinal.toFixed(2);
}

// función para limpiar el formulario
function limpiar(formulario){
    formulario.capitalInicial.value = "";
    document.getElementById("capitalMostrado").innerHTML = "$0.00";
    document.getElementById("gananciaMostrada").innerHTML = "$0.00";
    document.getElementById("totalMostrado").innerHTML = "$0.00";
}
