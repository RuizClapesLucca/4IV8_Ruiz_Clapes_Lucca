// Expresión regular para validar enteros positivos
var regexEntero = /^[0-9]+$/;

function calcular(formulario){
    var cantidadHombres = formulario.cantidadHombres.value;
    var cantidadMujeres = formulario.cantidadMujeres.value;
    
    if(cantidadHombres == ""){
        alert("Por favor ingresa la cantidad de hombres");
        formulario.cantidadHombres.focus();
        return false;
    }
    
    if(cantidadMujeres == ""){
        alert("Por favor ingresa la cantidad de mujeres");
        formulario.cantidadMujeres.focus();
        return false;
    }
    
    if(!regexEntero.test(cantidadHombres)){
        alert("La cantidad de hombres debe ser un número entero positivo");
        formulario.cantidadHombres.focus();
        return false;
    }
    
    if(!regexEntero.test(cantidadMujeres)){
        alert("La cantidad de mujeres debe ser un número entero positivo");
        formulario.cantidadMujeres.focus();
        return false;
    }
    
    var hombres = parseInt(cantidadHombres);
    var mujeres = parseInt(cantidadMujeres);
    
    var totalAlumnos = hombres + mujeres;
    
    if(totalAlumnos == 0){
        alert("El total de alumnos no puede ser 0");
        formulario.cantidadHombres.focus();
        return false;
    }
    
    var porcentajeHombres = (hombres / totalAlumnos) * 100;
    var porcentajeMujeres = (mujeres / totalAlumnos) * 100;
    
    document.getElementById("totalAlumnosMostrado").innerHTML = totalAlumnos;
    document.getElementById("porcentajeHombresMostrado").innerHTML = porcentajeHombres.toFixed(2) + "%";
    document.getElementById("porcentajeMujeresMostrado").innerHTML = porcentajeMujeres.toFixed(2) + "%";
}

function limpiar(formulario){
    formulario.cantidadHombres.value = "";
    formulario.cantidadMujeres.value = "";
    document.getElementById("totalAlumnosMostrado").innerHTML = "0";
    document.getElementById("porcentajeHombresMostrado").innerHTML = "0.00%";
    document.getElementById("porcentajeMujeresMostrado").innerHTML = "0.00%";
}
