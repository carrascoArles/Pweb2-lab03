document.getElementById("mostrarlista").addEventListener("click", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/archivos", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // La respuesta ha sido recibida correctamente
        var response = JSON.parse(xhr.responseText);
        // Mostrar la respuesta en algún elemento en la página
        var convertidoDiv = document.getElementById("convertido");
        convertidoDiv.innerHTML = ""; // Limpiar contenido anterior
        for (var i = 0; i < response.length; i++) {
          var fileName = response[i];
          var fileLink = document.createElement("a");
          fileLink.href = "/markdown/" + fileName; // Ruta a los archivos markdown
          fileLink.textContent = fileName;
          convertidoDiv.appendChild(fileLink);
          convertidoDiv.appendChild(document.createElement("br"));
        }
      } else {
        // Ocurrió un error al realizar la petición
        console.error(xhr.status);
      }
    }
  };
  xhr.send();
});
