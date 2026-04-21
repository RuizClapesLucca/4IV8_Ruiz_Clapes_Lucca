function validar(e){
    var teclado = (document.all)?e.keyCode:e.which;
    if (teclado==8) return true;
    var patron = /[0-9\d .]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba);
}
    function interes(){
        var valor = document.getElementById("cantidad1").value;
        var interes= parseFloat(valor);
    //10% anual
    var subtotal=interes*0.10;
    var total=interes+subtotal;
    document.getElementById("sueldoi").value="$"+total;
    }
    function borrar(){
        document.getElementById("cantidad1").value="";
        document.getElementById("sueldoi").value="";
    }