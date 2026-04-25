function problema1() {
    var input = document.querySelector("#p1-input").value;
    if (input.trim() === "") {
        document.querySelector("#p1-output").textContent = "Por favor, ingresa palabras separadas por espacios.";
        return;
    }
    var words = input.split(" ");
    var reversed = words.reverse();
    var result = reversed.join(" ");
    document.querySelector("#p1-output").textContent = "Palabras invertidas: " + result;
}

function problema2() {
    var p2_x1 = parseFloat(document.querySelector("#p2-x1").value);
    var p2_x2 = parseFloat(document.querySelector("#p2-x2").value);
    var p2_x3 = parseFloat(document.querySelector("#p2-x3").value);
    var p2_x4 = parseFloat(document.querySelector("#p2-x4").value);
    var p2_x5 = parseFloat(document.querySelector("#p2-x5").value);

    var p2_y1 = parseFloat(document.querySelector("#p2-y1").value);
    var p2_y2 = parseFloat(document.querySelector("#p2-y2").value);
    var p2_y3 = parseFloat(document.querySelector("#p2-y3").value);
    var p2_y4 = parseFloat(document.querySelector("#p2-y4").value);
    var p2_y5 = parseFloat(document.querySelector("#p2-y5").value);

    if (isNaN(p2_x1) || isNaN(p2_x2) || isNaN(p2_x3) || isNaN(p2_x4) || isNaN(p2_x5) ||
        isNaN(p2_y1) || isNaN(p2_y2) || isNaN(p2_y3) || isNaN(p2_y4) || isNaN(p2_y5)) {
        document.querySelector("#p2-output").textContent = "Por favor, ingresa todos los valores numéricos.";
        return;
    }

    //creamos vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    //ordenar v1 ascendente, v2 descendente para minimizar producto
    v1.sort(function(a, b){return a - b});
    v2.sort(function(a, b){return b - a});

    //calculo con ciclo
    var producto_escalar = 0;
    for (var i = 0; i < v1.length; i++) {
        producto_escalar += v1[i] * v2[i];
    }
    //mostrar resultado
    document.querySelector("#p2-output").textContent = "El producto escalar mínimo es: " + producto_escalar;
}

function problema3() {
    var input = document.querySelector("#p3-input").value;
    if (input.trim() === "") {
        document.querySelector("#p3-output").textContent = "Por favor, ingresa palabras separadas por comas.";
        return;
    }
    var words = input.split(",");
    var maxUnique = 0;
    var bestWord = "";
    for (var i = 0; i < words.length; i++) {
        var word = words[i].trim().toUpperCase();
        var uniqueChars = new Set();
        for (var j = 0; j < word.length; j++) {
            var char = word[j];
            if (char >= 'A' && char <= 'Z') {
                uniqueChars.add(char);
            }
        }
        var count = uniqueChars.size;
        if (count > maxUnique) {
            maxUnique = count;
            bestWord = words[i].trim();
        }
    }
    if (bestWord === "") {
        document.querySelector("#p3-output").textContent = "No se encontraron palabras válidas.";
    } else {
        document.querySelector("#p3-output").textContent = "La palabra con más caracteres únicos es: " + bestWord + " (" + maxUnique + " caracteres únicos)";
    }
}

