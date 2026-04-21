// expresión regular para validar números
var regexNumero = /^[0-9]+(\.[0-9]{1,2})?$/;

// función para calcular sueldo
function calcular(formulario){
    var sueldoBase = formulario.sueldoBase.value;
    var venta1 = formulario.venta1.value;
    var venta2 = formulario.venta2.value;
    var venta3 = formulario.venta3.value;
    
    // verificar que no estén vacíos
    if(sueldoBase == ""){
        alert("Por favor ingresa el sueldo base");
        formulario.sueldoBase.focus();
        return false;
    }
    
    if(venta1 == ""){
        alert("Por favor ingresa la venta 1");
        formulario.venta1.focus();
        return false;
    }
    
    if(venta2 == ""){
        alert("Por favor ingresa la venta 2");
        formulario.venta2.focus();
        return false;
    }
    
    if(venta3 == ""){
        alert("Por favor ingresa la venta 3");
        formulario.venta3.focus();
        return false;
    }
    
    // verificar que sean números válidos con regex
    if(!regexNumero.test(sueldoBase)){
        alert("El sueldo base debe ser un número positivo");
        formulario.sueldoBase.focus();
        return false;
    }
    
    if(!regexNumero.test(venta1)){
        alert("La venta 1 debe ser un número positivo");
        formulario.venta1.focus();
        return false;
    }
    
    if(!regexNumero.test(venta2)){
        alert("La venta 2 debe ser un número positivo");
        formulario.venta2.focus();
        return false;
    }
    
    if(!regexNumero.test(venta3)){
        alert("La venta 3 debe ser un número positivo");
        formulario.venta3.focus();
        return false;
    }
    
    // convertir a números
    var sueldoNum = parseFloat(sueldoBase);
    var v1 = parseFloat(venta1);
    var v2 = parseFloat(venta2);
    var v3 = parseFloat(venta3);
    
    // verificar que sean mayores a 0
    if(sueldoNum <= 0){
        alert("El sueldo base debe ser mayor a 0");
        formulario.sueldoBase.focus();
        return false;
    }
    
    // calcular total de ventas
    var totalVentas = v1 + v2 + v3;
    
    // calcular comisión (10% de cada venta)
    var comision = totalVentas * 0.10;
    
    // calcular sueldo final
    var sueldoFinal = sueldoNum + comision;
    
    // mostrar resultados
    document.getElementById("sueldoMostrado").innerHTML = "$" + sueldoNum.toFixed(2);
    document.getElementById("ventasMostrado").innerHTML = "$" + totalVentas.toFixed(2);
    document.getElementById("comisionMostrado").innerHTML = "$" + comision.toFixed(2);
    document.getElementById("sueldoFinalMostrado").innerHTML = "$" + sueldoFinal.toFixed(2);
}

// función para limpiar el formulario
function limpiar(formulario){
    formulario.sueldoBase.value = "";
    formulario.venta1.value = "";
    formulario.venta2.value = "";
    formulario.venta3.value = "";
    document.getElementById("sueldoMostrado").innerHTML = "$0.00";
    document.getElementById("ventasMostrado").innerHTML = "$0.00";
    document.getElementById("comisionMostrado").innerHTML = "$0.00";
    document.getElementById("sueldoFinalMostrado").innerHTML = "$0.00";
}
