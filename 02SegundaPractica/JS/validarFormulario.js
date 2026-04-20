function validarFormulario(Formulario){
    //Vamos a crear una funcion para validar un nombre minimo de caracteres en el formulario
    if(Formulario.Nombre.value.length <= 3){
        alert("Porfavor ingresa un nombre de minimo 3 caracteres");
        Formulario.Nombre.focus();
        return false;
    }
    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM"+ "qwertyuiopasdfghjklñzxcvbnm";
    var checkString = Formulario.Nombre.value;
    var allValid = true;
    //Tenemos que ir comprobando y recorriendo la cade caracter por caracter
    for(var i=0; i<checkString.length; i++){
        //Necesito la cadena pasarla a caracteres
        var caracteres= checkString.charAt(i);
        for(var j=0; j<abcOK.length; j++){
            if(caracteres==abcOK.charAt(j)){
                break;
            }
        }
        if(j==abcOK.length){
            allValid=false;
            break;
        }
    }
    if(!allValid){
        alert("Porfavor ingresa solo letras en el campo de nombre");
        Formulario.Nombre.focus();
        return false;
    }
    //algo.algo@algo.algo 
    var correoelctronico = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    var txt = Formulario.email.value;
    alert("Email" + (correoelectronico.test(txt)?"":" no") + " valido");
}   