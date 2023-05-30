// Mostrar lista de archivos
document.getElementById("show-files").addEventListener("click", () => {
  document.getElementById("Markdown-form").style.display = "none";

  const xhr = new XMLHttpRequest(); // Peticion AJAX
  xhr.open("GET", "/archivos", true);

  xhr.onreadystatechange = (err) => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const boxContainer = document.getElementById("box-container");

        boxContainer.innerHTML = "<h2> Lista de archivos </h2>";

        for (var i = 0; i < response.length; i++) {
          const fileName = response[i];
          const link = document.createElement("a");

          link.href = "/archivos/" + fileName; // Ruta a los archivos especificos
          link.textContent = fileName;

          boxContainer.appendChild(link);
          boxContainer.appendChild(document.createElement("br"));

          boxContainer.style.border = "1px solid #ccc";
          boxContainer.style.padding = "20px";
        }
      } else {
        console.error(err);
      }
    }
  };

  xhr.send();
});

// Mostrar formulario y ocultar la lista
document.getElementById("create-new").addEventListener("click", () => {
  document.getElementById("Markdown-form").style.display = "block";

  const boxContainer = document.getElementById("box-container");
  boxContainer.innerHTML = "";
  boxContainer.style.border = null;
  boxContainer.style.padding = null;
  boxContainer.style.minHeight = null;
});

// Crear y guardar archivo markdown
document.getElementById("Markdown-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const texto = document.getElementById("texto").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/crear", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        if (response.confirmar) {
          const confirmar = confirm(
            "El documento ya existe, ¿desea reescribirlo?"
          );
          if (confirmar) {
            reescribirArchivoMarkdown(titulo, texto);
          } else {
            console.log("Creación y guardado del archivo cancelado");
          }
        } else {
          console.log("Archivo creado y guardado exitosamente");
          alert("Archivo Markdown creado y guardado exitosamente");

          document.getElementById("titulo").value = "";
          document.getElementById("texto").value = "";
        }
      } else {
        console.error("Error al crear y guardar el archivo:", xhr.status);
      }
    }
  };

  var data = {
    titulo: titulo,
    texto: texto,
  };

  xhr.send(JSON.stringify(data));
});

// Funbcion por si el usuario acepta reescribir un archivo con el mismo titulo
function reescribirArchivoMarkdown(titulo, texto) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/crear", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("Archivo reescrito exitosamente");
        alert("Archivo Markdown reescrito exitosamente");

        document.getElementById("titulo").value = "";
        document.getElementById("texto").value = "";
      } else {
        console.error("Error al reescribir el archivo:", xhr.status);
      }
    }
  };

  var data = {
    titulo: titulo,
    texto: texto,
  };

  xhr.send(JSON.stringify(data));
}
