// Expresión regular para validar calificaciones 0-10
var regexCalificacion = /^[0-9]{1,2}(\.[0-9]{1,2})?$/;

function calcular(formulario){
    var parcial1 = formulario.parcial1.value;
    var parcial2 = formulario.parcial2.value;
    var parcial3 = formulario.parcial3.value;
    var examenFinal = formulario.examenFinal.value;
    var trabajoFinal = formulario.trabajoFinal.value;
    
    if(parcial1 == ""){
        alert("Por favor ingresa la calificación del parcial 1");
        formulario.parcial1.focus();
        return false;
    }
    
    if(parcial2 == ""){
        alert("Por favor ingresa la calificación del parcial 2");
        formulario.parcial2.focus();
        return false;
    }
    
    if(parcial3 == ""){
        alert("Por favor ingresa la calificación del parcial 3");
        formulario.parcial3.focus();
        return false;
    }
    
    if(examenFinal == ""){
        alert("Por favor ingresa la calificación del examen final");
        formulario.examenFinal.focus();
        return false;
    }
    
    if(trabajoFinal == ""){
        alert("Por favor ingresa la calificación del trabajo final");
        formulario.trabajoFinal.focus();
        return false;
    }
    
    if(!regexCalificacion.test(parcial1)){
        alert("El parcial 1 debe ser un número entre 0 y 10");
        formulario.parcial1.focus();
        return false;
    }
    
    if(!regexCalificacion.test(parcial2)){
        alert("El parcial 2 debe ser un número entre 0 y 10");
        formulario.parcial2.focus();
        return false;
    }
    
    if(!regexCalificacion.test(parcial3)){
        alert("El parcial 3 debe ser un número entre 0 y 10");
        formulario.parcial3.focus();
        return false;
    }
    
    if(!regexCalificacion.test(examenFinal)){
        alert("El examen final debe ser un número entre 0 y 10");
        formulario.examenFinal.focus();
        return false;
    }
    
    if(!regexCalificacion.test(trabajoFinal)){
        alert("El trabajo final debe ser un número entre 0 y 10");
        formulario.trabajoFinal.focus();
        return false;
    }
    
    var p1 = parseFloat(parcial1);
    var p2 = parseFloat(parcial2);
    var p3 = parseFloat(parcial3);
    var ef = parseFloat(examenFinal);
    var tf = parseFloat(trabajoFinal);
    
    if(p1 < 0 || p1 > 10){
        alert("El parcial 1 debe estar entre 0 y 10");
        formulario.parcial1.focus();
        return false;
    }
    
    if(p2 < 0 || p2 > 10){
        alert("El parcial 2 debe estar entre 0 y 10");
        formulario.parcial2.focus();
        return false;
    }
    
    if(p3 < 0 || p3 > 10){
        alert("El parcial 3 debe estar entre 0 y 10");
        formulario.parcial3.focus();
        return false;
    }
    
    if(ef < 0 || ef > 10){
        alert("El examen final debe estar entre 0 y 10");
        formulario.examenFinal.focus();
        return false;
    }
    
    if(tf < 0 || tf > 10){
        alert("El trabajo final debe estar entre 0 y 10");
        formulario.trabajoFinal.focus();
        return false;
    }
    
    var promedioParciales = (p1 + p2 + p3) / 3;
    // Aplicar porcentajes: 55% parciales, 30% examen, 15% trabajo
    var calificacionFinal = (promedioParciales * 0.55) + (ef * 0.30) + (tf * 0.15);
    
    document.getElementById("calificacionFinalMostrada").innerHTML = calificacionFinal.toFixed(2);
}

function limpiar(formulario){
    formulario.parcial1.value = "";
    formulario.parcial2.value = "";
    formulario.parcial3.value = "";
    formulario.examenFinal.value = "";
    formulario.trabajoFinal.value = "";
    document.getElementById("calificacionFinalMostrada").innerHTML = "0.00";
}
