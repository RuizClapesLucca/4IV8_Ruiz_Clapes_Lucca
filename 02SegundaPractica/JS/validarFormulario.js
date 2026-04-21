function validarFormulario(Formulario) {
    var nombre = Formulario.Nombre.value.trim();
    if (nombre.length <= 3) {
        alert("Por favor ingresa un nombre de al menos 4 caracteres.");
        Formulario.Nombre.focus();
        return false;
    }

    var nombreValido = /^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$/;
    if (!nombreValido.test(nombre)) {
        alert("Por favor ingresa solo letras en el campo Nombre.");
        Formulario.Nombre.focus();
        return false;
    }

    var edad = parseInt(Formulario.edad.value, 10);
    if (isNaN(edad) || edad < 15 || edad > 100) {
        alert("La edad debe ser un número entre 15 y 100 años.");
        Formulario.edad.focus();
        return false;
    }

    var correoElectronico = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    var email = Formulario.gmail.value.trim();
    if (!correoElectronico.test(email)) {
        alert("Por favor ingresa un correo electrónico válido.");
        Formulario.gmail.focus();
        return false;
    }

    return true;
}
