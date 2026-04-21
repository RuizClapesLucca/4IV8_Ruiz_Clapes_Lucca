// Expresión regular para validar años de 4 dígitos
var regexAnio = /^[0-9]{4}$/;

function calcular(formulario){
    var anioNacimiento = formulario.anioNacimiento.value;
    
    if(anioNacimiento == ""){
        alert("Por favor ingresa tu año de nacimiento");
        formulario.anioNacimiento.focus();
        return false;
    }
    
    if(!regexAnio.test(anioNacimiento)){
        alert("El año debe tener 4 dígitos");
        formulario.anioNacimiento.focus();
        return false;
    }
    
    var anio = parseInt(anioNacimiento);
    
    var anioActual = new Date().getFullYear();
    
    if(anio > anioActual){
        alert("El año de nacimiento no puede ser futuro");
        formulario.anioNacimiento.focus();
        return false;
    }
    
    if(anio < (anioActual - 150)){
        alert("El año de nacimiento parece incorrecto");
        formulario.anioNacimiento.focus();
        return false;
    }
    
    // Calcular edad restando año actual menos año nacimiento
    var edad = anioActual - anio;
    
    document.getElementById("anioActualMostrado").innerHTML = anioActual;
    document.getElementById("edadMostrada").innerHTML = edad + " años";
}

function limpiar(formulario){
    formulario.anioNacimiento.value = "";
    document.getElementById("anioActualMostrado").innerHTML = "2026";
    document.getElementById("edadMostrada").innerHTML = "0 años";
}
